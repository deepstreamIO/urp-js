/* tslint:disable:no-bitwise */

import {
  ACTIONS,
  PARSER_ACTIONS,
  TOPIC,
  META_KEYS,
  PAYLOAD_ENCODING,
  Message,
  ParseResult,
} from './message-constants'

import { HEADER_LENGTH } from './constants'

import { isWriteAck } from './utils'

import {
  validateMeta,
  hasPayload,
} from './message-validator'

export interface RawMessage {
  fin: boolean
  topic: number
  action: number
  meta?: Uint8Array
  payload?: Uint8Array
  rawHeader: Uint8Array
}

export function isError (message: Message) {
  return (message.action >= 0x50 && message.action < 0x70) || message.topic === TOPIC.PARSER
}

export function parse (buffer: Uint8Array, queue: Array<RawMessage> = []): Array<ParseResult> {
  debugger
  let offset = 0
  const messages: Array<ParseResult> = []
  do {
    const { bytesConsumed, rawMessage } = readBinary(buffer, offset)
    if (!rawMessage) {
      break
    }
    queue.push(rawMessage)
    offset += bytesConsumed
    if (rawMessage.fin) {
      const joinedMessage = joinMessages(queue)
      const message = parseMessage(joinedMessage)
      queue.length = 0
      messages.push(message)
    }
  } while (offset < buffer.length)
  return messages
}

export function parseData (message: Message): true | Error {
  if (message.parsedData !== undefined || message.data === undefined) {
    return true
  }

  if (message.payloadEncoding && message.payloadEncoding !== PAYLOAD_ENCODING.JSON) {
    return new Error(`unable to parse data of type '${message.payloadEncoding}'`)
  }

  if (typeof message.data === 'string') {
    return new Error('tried to parse string data with binary parser')
  }

  message.parsedData = parseJSON(message.data)
  if (message.parsedData === undefined) {
    return new Error(`unable to parse data ${message.data}`)
  }

  return true
}

function readBinary (buff: Uint8Array, offset: number): { bytesConsumed: number, rawMessage?: RawMessage } {
  if (buff.length < (offset + HEADER_LENGTH)) {
    return { bytesConsumed: 0 }
  }
  const fin: boolean = !!(buff[offset] & 0x80)
  const topic = buff[offset] & 0x7F
  const action = buff[offset + 1]
  const metaLength = readNumber(buff, offset + 2)
  const payloadLength = readNumber(buff, offset + 5)
  const messageLength = HEADER_LENGTH + metaLength + payloadLength

  if (buff.length < (offset + messageLength)) {
    return { bytesConsumed: 0 }
  }

  const rawHeader = buff.slice(offset, offset + HEADER_LENGTH)

  const rawMessage: RawMessage = { fin, topic, action, rawHeader }
  if (metaLength > 0) {
    rawMessage.meta = buff.slice(offset + HEADER_LENGTH, offset + HEADER_LENGTH + metaLength)
  }
  if (payloadLength > 0) {
    rawMessage.payload = buff.slice(offset + HEADER_LENGTH + metaLength, offset + messageLength)
  }
  return {
    bytesConsumed: messageLength,
    rawMessage,
  }
}

function joinMessages (rawMessages: Array<RawMessage>): RawMessage {
  if (rawMessages.length === 0) {
    throw new Error('parseMessage must not be called with an empty message queue')
  }
  if (rawMessages.length === 1) {
    return rawMessages[0]
  }

  const { topic, action, rawHeader, meta, payload } = rawMessages[0]
  // const payloadSections: Array<Uint8Array> = []
  // const metaSections: Array<Uint8Array> = []
  // rawMessages.forEach(({ payload: payloadSection, meta: metaSection }) => {
  //   if (payloadSection) {
  //     payloadSections.push(payloadSection)
  //   }
  //   if (metaSection) {
  //     metaSections.push(metaSection)
  //   }
  // })
  return { fin: true, topic, action, rawHeader, meta, payload }
}

function parseMessage (rawMessage: RawMessage): ParseResult {
  const { topic: rawTopic, action: rawAction, rawHeader } = rawMessage
  if (TOPIC[rawTopic] === undefined) {
    return {
      parseError: true,
      action: PARSER_ACTIONS.UNKNOWN_TOPIC,
      parsedMessage: {
        topic: rawTopic,
        action: rawAction
      },
      description: `unknown topic ${rawTopic}`,
      raw: rawHeader
    }
  }
  const topic: TOPIC = rawTopic
  if ((ACTIONS as any)[topic][rawAction] === undefined) {
    return {
      parseError: true,
      action: PARSER_ACTIONS.UNKNOWN_ACTION,
      parsedMessage: {
        topic,
        action: rawAction
      },
      description: `unknown ${TOPIC[topic]} action ${rawAction}`,
      raw: rawHeader
    }
  }
  // mask out uppermost bit(ACK)
  const action: Message['action'] = rawAction & 0x7F

  const message: Message = { topic, action }
  if (rawMessage.meta && rawMessage.meta.length > 0) {
    const meta = parseJSON(rawMessage.meta)
    if (!meta || typeof meta !== 'object') {
      return {
        parseError: true,
        action: PARSER_ACTIONS.MESSAGE_PARSE_ERROR,
        parsedMessage: message,
        description: `invalid meta field ${rawMessage.meta.toString()}`,
        raw: rawHeader
      }
    }
    const metaError = validateMeta(topic, rawAction, meta)
    if (metaError) {
      throw new Error(`invalid meta ${TOPIC[message.topic]} ${(ACTIONS as any)[message.topic][message.action]}: ${metaError}`)
      // return {
      //   parseError: true,
      //   action: PARSER_ACTIONS.INVALID_META_PARAMS,
      //   parsedMessage: message,
      //   description: 'invalid ack'
      // }
    }
    addMetadataToMessage(meta, message)
  }

  if (rawMessage.payload !== undefined) {
    if (!hasPayload(message.topic, rawAction)) {
      return {
        parseError: true,
        action: PARSER_ACTIONS.INVALID_MESSAGE,
        parsedMessage: message,
        description: 'should not have a payload'
      }
    }

    if (!message.payloadEncoding && topic === TOPIC.PARSER) {
      message.payloadEncoding = PAYLOAD_ENCODING.BINARY
    }

    message.data = rawMessage.payload
  }

  // if (rawMessage.payload && rawMessage.payload.length > 0) {
  //   const payload = parseJSON(rawMessage.payload)
  //   if (payload === undefined) {
  //     return {
  //       parseError: true,
  //       description: `invalid message data ${rawMessage.payload.toString()}`,
  //       parsedMessage: message,
  //       raw: rawHeader
  //     }
  //   }
  //   message.data = payload
  // }

  message.isAck = rawAction >= 0x80
  message.isError = isError(message)
  if (message.topic === TOPIC.RECORD && isWriteAck(rawAction)) {
    message.isWriteAck = true
  }
  return message
}

function addMetadataToMessage (meta: any, message: any): void {
  for (const key in META_KEYS) {
    const value = meta[META_KEYS[key]]
    if (value !== undefined) {
      message[key] = value
    }
  }
}

export function parseJSON (buff: Uint8Array): any {
  try {
    return JSON.parse(readString(buff))
  } catch (err) {
    return undefined
  }
}

function readNumber (from: Uint8Array, start: number): number {
    let value = 0
    for (let i = start; i < start + 3; i++) {
      value = (value * 256) + from[i]
    }
    return value
}

function readString (array: Uint8Array) {
  let out, i, len, c
  let char2, char3

  out = ''
  len = array.length
  i = 0
  while (i < len) {
    c = array[i++]
    switch (c >> 4) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
      // 0xxxxxxx
      out += String.fromCharCode(c)
      break
      case 12: case 13:
      // 110x xxxx   10xx xxxx
      char2 = array[i++]
      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F))
      break
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++]
        char3 = array[i++]
        out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0))
        break
    }
  }

  return out
}
