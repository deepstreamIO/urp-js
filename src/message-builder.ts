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
  TOPIC,
  ACTIONS,
  ALL_ACTIONS,
  RECORD_ACTIONS,
  // PAYLOAD_ENCODING,
  Message,
} from './message-constants'

import {
  ACTION_TO_WRITE_ACK,
  isWriteAck,
} from './utils'

import {
  HEADER_LENGTH,
  // META_PAYLOAD_OVERFLOW_LENGTH,
} from './constants'

// import {
//   validateMeta,
//   hasPayload,
// } from './message-validator'

import { Dictionary } from 'ts-essentials'

export function getMessage (msg: Message, isAck: boolean): Uint8Array {
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

  const meta = {
    e: message.payloadEncoding,
    n: message.name,
    m: message.names,
    s: message.subscription,
    v: message.version,
    p: message.path,
    r: message.reason,
    u: message.url,
    t: message.originalTopic,
    a: message.originalAction,
    x: message.protocolVersion,
    rn: message.requestorName,
    rd: message.requestorData,
    ts: message.trustedSender,
    rt: message.registryTopic
  }

  // if (meta[META_KEYS.payloadEncoding] === PAYLOAD_ENCODING.JSON) {
  //   delete meta[META_KEYS.payloadEncoding]
  // }

  // const metaError = validateMeta(message.topic, action, meta)
  // if (metaError) {
  //   throw new Error(`invalid ${TOPIC[message.topic]} ${(ACTIONS as any)[message.topic][action] || action}: ${metaError}`)
  // }

  let metaStr: string | null = JSON.stringify(meta)
  metaStr = metaStr === '{}' ? null : metaStr

  // let payloadBuff: Uint8Array | null
  let payloadStr: string | null = null
  if (message.data instanceof ArrayBuffer) {
    // payloadBuff = message.data
  } else if (message.data !== undefined || message.parsedData !== undefined) {
    if (message.data === undefined) {
      payloadStr = JSON.stringify(message.parsedData)
    }
  } else {
    // payloadBuff = null
  }

  // if (payloadBuff && !hasPayload(message.topic, action)) {
  //   console.error(`invalid message ${TOPIC[message.topic]} ${message.action}: should not have payload`)
  // }

  // if (metaBuffLength <= META_PAYLOAD_OVERFLOW_LENGTH
  //   && payloadBuffLength <= META_PAYLOAD_OVERFLOW_LENGTH
  // ) {
  return buildRaw(true, message.topic, action, metaStr, payloadStr)
  // } else {
  //   return buildMultipart(message.topic, action, metaBuff, payloadBuff)
  // }
}

// function buildMultipart (topic: TOPIC, action: ALL_ACTIONS, meta: Uint8Array | null, payload: Uint8Array | null): Array<Uint8Array> {
//   const metaLength = meta ? meta.length : 0
//   const payloadLength = payload ? payload.length : 0
//   const messageParts: Array<Uint8Array> = []
//   let metaSectionOffset = 0
//   let payloadSectionOffset = 0
//   let fin: boolean
//   do {
//     const metaSectionLength = Math.min(
//       metaLength - metaSectionOffset,
//       META_PAYLOAD_OVERFLOW_LENGTH
//     )
//     const payloadSectionLength = Math.min(
//       payloadLength - payloadSectionOffset,
//       META_PAYLOAD_OVERFLOW_LENGTH
//     )
//
//     const metaSection = meta && meta.slice(
//       metaSectionOffset,
//       metaSectionOffset + metaSectionLength
//     )
//     const payloadSection = payload && payload.slice(
//       payloadSectionOffset,
//       payloadSectionOffset + payloadSectionLength
//     )
//
//     metaSectionOffset += metaSectionLength
//     payloadSectionOffset += payloadSectionLength
//
//     fin = metaSectionOffset === metaLength && payloadSectionOffset === payloadLength
//
//     messageParts.concat(
//       buildRaw(fin, topic, action, metaSection, payloadSection)
//     )
//   } while (!fin)
//   return messageParts
// }

function buildRaw (fin: boolean, topic: TOPIC, action: ALL_ACTIONS, meta: string | null, payload: string | null): Uint8Array {
  const metaLength = meta ? meta.length : 0
  const payloadLength = payload ? payload.length : 0
  const messageBufferLength = HEADER_LENGTH + metaLength + payloadLength
  const messageBuffer = new Uint8Array(messageBufferLength)
  const dataView = new DataView(messageBuffer)

  messageBuffer[0] = fin ? topic : 0x80 | topic
  messageBuffer[1] = action
  dataView.setUint32(2, metaLength, false)
  insertNumber(payloadLength, messageBuffer, 5)

  if (meta) {
    insertString(meta, messageBuffer, HEADER_LENGTH)
  }
  if (payload) {
    insertString(payload, messageBuffer, HEADER_LENGTH + metaLength)
  }
  return messageBuffer
}

const numberBuffer: Dictionary<Uint8Array, number> = {}

function insertNumber (n: number, into: Uint8Array, start: number): Uint8Array {
  if (numberBuffer[n]) {
    for (let i = 2; i >= 0; i--) {
      into[start + i] = numberBuffer[n][i]
    }
    return into
  }

  const buffer = new Uint8Array(3)
  for (let index = 2; index >= 0; index--) {
    const byte = n & 0xff
    buffer[index] = (byte)
    into[start + index] = byte
    n = (n - byte) / 256
  }
  numberBuffer[n] = buffer
  return into
}

function insertString (s: string, into: Uint8Array, start: number): Uint8Array {
  for (let i = 0; i < s.length; i++) {
    into[i + start] = s.charCodeAt(i)
  }
  return into
}
