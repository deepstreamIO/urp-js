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
  EVENT,
  TOPIC,
  ACTIONS,
  PRESENCE_ACTIONS,
  RECORD_ACTIONS,
  RPC_ACTIONS,
  EVENT_ACTIONS,
  CONNECTION_ACTIONS,
  AUTH_ACTIONS,
  META_KEYS,
  Message
} from './message-constants'

import {
  actionToWriteAck,
  isWriteAck,
  HEADER_LENGTH,
  MAX_ARGS_LENGTH,
  PAYLOAD_OVERFLOW_LENGTH,
} from './constants'

export function getErrorMessage (message: Message, errorEvent: EVENT | any, reason: string): Buffer {
  const topic: TOPIC = message.topic
  const actions = (ACTIONS as any)[topic]
  const action = actions.ERROR
  switch (topic) {
    case TOPIC.CONNECTION:
    case TOPIC.AUTH:
    case TOPIC.EVENT:
    case TOPIC.RECORD:
    case TOPIC.RPC:
    case TOPIC.PRESENCE:
      return getMessage({ topic, action, reason: EVENT[errorEvent as any] }, false)
    default:
      throw new Error(`tried to create error message for topic ${TOPIC[topic]}`)
  }
}

export function getMessage (msg: Message, isAck: boolean): Buffer {
  const message = msg as any
  let action = message.action

  if (message.isWriteAck && !isWriteAck(message.action as RECORD_ACTIONS)) {
    action = actionToWriteAck[message.action]
  }

  if (message.isAck || isAck) {
    action |= 0x80
  }

  const meta = Object.create(null)
  for (const key in META_KEYS) {
    meta[META_KEYS[key]] = message[key]
  }

  const metaStr = JSON.stringify(meta)
  const metaBuff = metaStr === '{}' ? Buffer.from([]) : Buffer.from(JSON.stringify(meta), 'utf8')

  if (metaBuff.length > MAX_ARGS_LENGTH) {
    throw new Error(`Argument object too long: ${metaBuff.length} cannot be encoded in 24 bits`)
  }

  let payloadBuff: Buffer
  if (message.data instanceof Buffer) {
    payloadBuff = message.data
  } else if (message.data === undefined && message.parsedData === undefined) {
    payloadBuff = Buffer.from([])
  } else {
    let payloadStr = message.data
    if (payloadStr === undefined) {
      payloadStr = JSON.stringify(message.parsedData)
    }
    payloadBuff = Buffer.from(payloadStr, 'utf8')
  }

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
