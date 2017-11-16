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
  ALL_ACTIONS,
  PRESENCE_ACTIONS,
  RECORD_ACTIONS,
  RPC_ACTIONS,
  EVENT_ACTIONS,
  CONNECTION_ACTIONS,
  AUTH_ACTIONS,
  META_KEYS,
  PAYLOAD_ENCODING,
  Message,
} from './message-constants'

import {
  ACTION_TO_WRITE_ACK,
  isWriteAck,
} from './utils'

import {
  HEADER_LENGTH,
  META_PAYLOAD_OVERFLOW_LENGTH,
} from './constants'

import {
  validateMeta,
  hasPayload,
} from './message-validator'

export function getMessage (msg: Message, isAck: boolean): Buffer {
  const message = msg as any
  let action = message.action

  // convert action to write ack if necessary
  if (message.isWriteAck && !isWriteAck(message.action as RECORD_ACTIONS)) {
    action = ACTION_TO_WRITE_ACK[message.action]
  }

  if (message.isAck || isAck) {
    action |= 0x80
    if ((ACTIONS as any)[message.topic][message.action] === undefined) {
      throw new Error(`message ${TOPIC[message.topic]} ${message.action} should not have an ack`)
    }
  }

  const meta = Object.create(null)
  for (const key in META_KEYS) {
    meta[META_KEYS[key]] = message[key]
  }
  if (meta[META_KEYS.payloadEncoding] === PAYLOAD_ENCODING.JSON) {
    delete meta[META_KEYS.payloadEncoding]
  }

  const metaError = validateMeta(message.topic, action, meta)
  if (metaError) {
    throw new Error(`invalid ${TOPIC[message.topic]} ${(ACTIONS as any)[message.topic][action] || action}: ${metaError}`)
  }

  const metaStr = JSON.stringify(meta)
  const metaBuff = metaStr === '{}' ? null : Buffer.from(metaStr, 'utf8')

  let payloadBuff: Buffer | null
  if (message.data instanceof Buffer) {
    payloadBuff = message.data
  } else if (message.data !== undefined || message.parsedData !== undefined) {
    let payloadStr = message.data
    if (payloadStr === undefined) {
      payloadStr = JSON.stringify(message.parsedData)
    }
    payloadBuff = Buffer.from(payloadStr, 'utf8')
  } else {
    payloadBuff = null
  }

  if (payloadBuff && !hasPayload(message.topic, action)) {
    console.error(`invalid message ${TOPIC[message.topic]} ${message.action}: should not have payload`)
  }

  const metaBuffLength = metaBuff ? metaBuff.length : 0
  const payloadBuffLength = payloadBuff ? payloadBuff.length : 0

  if (metaBuffLength <= META_PAYLOAD_OVERFLOW_LENGTH
    && payloadBuffLength <= META_PAYLOAD_OVERFLOW_LENGTH
  ) {
    return buildRaw(true, message.topic, action, metaBuff, payloadBuff)
  } else {
    return buildMultipart(message.topic, action, metaBuff, payloadBuff)
  }
}

function buildMultipart (topic: TOPIC, action: ALL_ACTIONS, meta: Buffer | null, payload: Buffer | null): Buffer {
  const metaLength = meta ? meta.length : 0
  const payloadLength = payload ? payload.length : 0
  const messageParts: Array<Buffer> = []
  let metaSectionOffset = 0
  let payloadSectionOffset = 0
  let fin: boolean
  do {
    const metaSectionLength = Math.min(
      metaLength - metaSectionOffset,
      META_PAYLOAD_OVERFLOW_LENGTH
    )
    const payloadSectionLength = Math.min(
      payloadLength - payloadSectionOffset,
      META_PAYLOAD_OVERFLOW_LENGTH
    )

    const metaSection = meta && meta.slice(
      metaSectionOffset,
      metaSectionOffset + metaSectionLength
    )
    const payloadSection = payload && payload.slice(
      payloadSectionOffset,
      payloadSectionOffset + payloadSectionLength
    )

    metaSectionOffset += metaSectionLength
    payloadSectionOffset += payloadSectionLength

    fin = metaSectionOffset === metaLength && payloadSectionOffset === payloadLength

    messageParts.push(
      buildRaw(fin, topic, action, metaSection, payloadSection)
    )
  } while (!fin)
  return Buffer.concat(messageParts)
}

function buildRaw (fin: boolean, topic: TOPIC, action: ALL_ACTIONS, meta: Buffer | null, payload: Buffer | null): Buffer {
  const metaLength = meta ? meta.length : 0
  const payloadLength = payload ? payload.length : 0
  const messageBufferLength = HEADER_LENGTH + metaLength + payloadLength
  const messageBuffer: Buffer = Buffer.allocUnsafe(messageBufferLength)

  messageBuffer[0] = (fin ? 0x80 : 0x00) | topic
  messageBuffer[1] = action
  messageBuffer.writeUIntBE(metaLength, 2, 3)
  messageBuffer.writeUIntBE(payloadLength, 5, 3)

  if (meta) {
    meta.copy(messageBuffer, HEADER_LENGTH)
  }
  if (payload) {
    payload.copy(messageBuffer, HEADER_LENGTH + metaLength)
  }
  return messageBuffer
}
