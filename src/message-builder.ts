/**
 * Functions for handling (de)serialization of the deepstream binary realtime protocol.
 *
 * In brief, a message is a variable length binary blob with the following structure:
 *
 *  0                   1                   2                   3
 *  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 * +-+-------------+-+-------------+-------------------------------+
 * |F|  Message    |A|  Message    |             Meta              |
 * |I|   Topic     |C|  Action     |            Length             |
 * |N|    (7)      |K|   (7)       |             (24)              |
 * +-+-------------+-+-------------+-------------------------------+
 * | Meta Cont.    |              Payload Length (24)              |
 * +---------------+-----------------------------------------------+
 * :                     Meta Data (Meta Length * 8)               :
 * + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
 * |                  Payload Data (Payload Length * 8)            :
 * +---------------------------------------------------------------+
 *
 * The first 6 bytes of the message are the header, and the rest of the message is the payload.
 *
 * CONT (1 bit): The continuation bit. If this is set, the following payload of the following
 *                message must be appended to this one. If this is not set, parsing may finish
 *                after the payload is read.
 * RSV{0..3} (1 bit): Reserved for extension.
 * Meta Length (24 bits, unsigned big-endian): The total length of Meta Data in bytes.
 *                If Meta Data can be no longer than 16 MB.
 * Payload Length (24 bits, unsigned big-endian): The total length of Payload in bytes.
 *                If Payload is longer than 16 MB, it must be split into chunks of
 *                less than 2^24 bytes with identical topic and action, setting the CONT bit
 *                in all but the final chunk.
 *
 */
/* tslint:disable:no-bitwise */
import {
  ACTIONS_BYTE_TO_PAYLOAD as ABP,
  ACTIONS_BYTE_TO_TEXT as ABT,
  actionToWriteAck,
  AUTH_ACTIONS as AA,
  CONNECTION_ACTIONS as CA,
  DEEPSTREAM_TYPES as TYPES,
  EVENT_ACTIONS as EA,
  isWriteAck,
  MESSAGE_PART_SEPERATOR as y,
  MESSAGE_SEPERATOR as x,
  PAYLOAD_ENCODING,
  PRESENCE_ACTIONS as UA,
  RECORD_ACTIONS as RA,
  RPC_ACTIONS as PA,
  TOPIC,
  TOPIC_BYTE_TO_TEXT as TBT,
} from '../../text/src/constants'

import {
  ARGUMENTS,
  HEADER_LENGTH,
  MAX_ARGS_LENGTH,
  PAYLOAD_OVERFLOW_LENGTH,
} from './constants'

/*
 * Serialize a binary message
 * If a payload is provided it will be serialized as JSON
 *
 * @param topicByte  {Integer}             topic enum 0 <= n < 256
 * @param actionByte {Integer}             action enum 0 <= n < 256
 * @param data       {Buffer|Object|Value} a buffer to send, or some JSON.stringify-able value
 *
 * @returns {Buffer} the serialized data buffer
 *
 * @throws when length of serialized data is greater than MAX_ARGS_LENGTH
 * @throws if the data object contains circular references
 */
export function getBinaryMessage (message: Message) {
  if (message.parsedData && message.data === undefined) {
    message.data = JSON.stringify(message.parsedData)
  }

  let action = message.action

  if ((message as RecordWriteMessage).isWriteAck && !isWriteAck(message.action)) {
    console.log('>>>>', message, action, actionToWriteAck)
    action = actionToWriteAck[message.action]
  }

  const meta = Object.create(null)
  meta[ARGUMENTS.name] = message.name
  meta[ARGUMENTS.correlationId] = (message as RPCMessage).correlationId
  meta[ARGUMENTS.version] = (message as RecordWriteMessage).version
  meta[ARGUMENTS.path] = (message as RecordWriteMessage).path

  const metaStr = JSON.stringify(meta)
  const metaBuff = metaStr === '{}' ? Buffer.from([]) : strToBuff(JSON.stringify(meta))

  if (metaBuff.length > MAX_ARGS_LENGTH) {
    throw new Error(`Argument object too long: ${metaBuff.length} cannot be encoded in 24 bits`)
  }

  const payloadBuff = strToBuff(message.data)

  console.log({ message, meta, metaLen: metaBuff.length, payloadLen: payloadBuff.length })

  if (payloadBuff.length > PAYLOAD_OVERFLOW_LENGTH) {
    throw new Error('payload overflow not implemented')
  }
  const fin = 0x80 // (in case of payload overflow, the bit is cleared)

  const messageBufferLength = HEADER_LENGTH + metaBuff.length + payloadBuff.length
  const messageBuffer: Buffer = Buffer.allocUnsafe(messageBufferLength)

  messageBuffer[0] = fin | message.topic
  messageBuffer[1] = action
  messageBuffer.writeUIntBE(metaBuff.length, 2, 3)
  messageBuffer.writeUIntBE(payloadBuff.length, 5, 3)

  if (metaBuff) {
    metaBuff.copy(messageBuffer, HEADER_LENGTH)
  }
  if (payloadBuff) {
    payloadBuff.copy(messageBuffer, HEADER_LENGTH + metaBuff.length)
  }
  return messageBuffer
}

function strToBuff (str: string | undefined): Buffer {
  return str === undefined ? Buffer.from([]) : Buffer.from(str, 'utf8')
}
