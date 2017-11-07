/* tslint:disable:no-bitwise */

import {
  ACTIONS,
  RECORD_ACTIONS,
  PARSER_ACTIONS,
  PRESENCE_ACTIONS,
  EVENT_ACTIONS,
  RPC_ACTIONS,
  AUTH_ACTIONS,
  CONNECTION_ACTIONS,
  TOPIC,
  META_KEYS,
  Message,
  ParseResult
} from './message-constants'

import {
  isWriteAck,
  HEADER_LENGTH,
} from './constants'

export interface RawMessage {
  fin: boolean
  topic: number
  action: number
  meta?: Buffer
  payload?: Buffer
  rawHeader: Buffer
}

export function parse (buffer: Buffer, queue: Array<RawMessage> = []): Array<ParseResult> {
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

  if (typeof message.data === 'string') {
    return new Error('tried to parse string data with binary parser')
  }

  message.parsedData = parseJSON(message.data)
  if (message.parsedData === undefined) {
    return new Error(`unable to parse data ${message.data}`)
  }

  return true
}

function readBinary (buff: Buffer, offset: number):
{ bytesConsumed: number, rawMessage?: RawMessage } {
  if (buff.length < (offset + HEADER_LENGTH)) {
    return { bytesConsumed: 0 }
  }
  const fin: boolean = !!(buff[offset] & 0x80)
  const topic = buff[offset] & 0x7F
  const action = buff[offset + 1]
  const metaLength = buff.readUIntBE(offset + 2, 3)
  const payloadLength = buff.readUIntBE(offset + 5, 3)
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

  const { topic, action, rawHeader } = rawMessages[0]
  const payloadSections: Array<Buffer> = []
  const metaSections: Array<Buffer> = []
  rawMessages.forEach(({ payload: payloadSection, meta: metaSection }) => {
    if (payloadSection) {
      payloadSections.push(payloadSection)
    }
    if (metaSection) {
      metaSections.push(metaSection)
    }
  })
  const payload = Buffer.concat(payloadSections)
  const meta = Buffer.concat(metaSections)
  return { fin: true, topic, action, rawHeader, meta, payload }
}

function parseMessage (rawMessage: RawMessage): ParseResult {
  const { topic: rawTopic, action: rawAction, rawHeader } = rawMessage
  if (TOPIC[rawTopic] === undefined) {
    return {
      parseError: true,
      description: `unknown topic ${rawTopic}`,
      action: PARSER_ACTIONS.UNKNOWN_TOPIC,
      raw: rawHeader
    }
  }
  const topic: TOPIC = rawTopic
  if ((ACTIONS as any)
  [topic][rawAction] === undefined) {
    return {
      parseError: true,
      description: `unknown ${TOPIC[topic]} action ${rawAction}`,
      action: PARSER_ACTIONS.UNKNOWN_ACTION,
      raw: rawHeader
    }
  }
  const action: Message['action'] = rawAction & 0x7F

  const message: Message = { topic, action }
  if (rawMessage.meta && rawMessage.meta.length > 0) {
    const meta = parseJSON(rawMessage.meta)
    if (!meta || typeof meta !== 'object') {
      return {
        parseError: true,
        description: `invalid meta field ${rawMessage.meta.toString()}`,
        parsedMessage: message,
        action: PARSER_ACTIONS.MESSAGE_PARSE_ERROR,
        raw: rawHeader
      }
    }
    addMetadataToMessage(meta, message)
  }

  if (topic === TOPIC.PARSER && action === PARSER_ACTIONS.MESSAGE_PARSE_ERROR) {
    message.raw = rawMessage.payload
  } else {
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
  message.isError = (rawAction >= 0x50 && rawAction < 0x70) || rawTopic === TOPIC.PARSER

  if (message.topic === TOPIC.RECORD
    && rawAction >= 0x10
    && rawAction < 0x20
  ) {
    message.isWriteAck = isWriteAck(message.action as RECORD_ACTIONS)
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

export function parseJSON (buff: Buffer): any {
  try {
    return JSON.parse(buff.toString())
  } catch (err) {
    return undefined
  }
}
