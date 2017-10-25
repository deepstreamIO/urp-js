/* tslint:disable:no-bitwise */
import {
  ACTIONS_BYTE_TO_KEY,
  isWriteAck,
  TOPIC_BYTE_TO_KEY,
  writeAckToAction,
} from '../../text/src/constants'

import {
  TOPIC,
} from '../../../src/constants'

import {
  ARGUMENTS,
  HEADER_LENGTH,
  MAX_ARGS_LENGTH,
  PAYLOAD_OVERFLOW_LENGTH,
} from './constants'

interface RawMessage {
  fin: boolean
  topic: number
  action: number
  meta?: Buffer
  payload?: Buffer
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

export function parseData (message: GenericMessage): true | string {
  if (message.parsedData !== undefined || message.data === undefined) {
    return true
  }

  message.parsedData = parseJSON(message.data)
  if (message.parsedData === undefined) {
    return `unable to parse data ${message.data}`
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

  const rawMessage: RawMessage = { fin, topic, action }
  if (metaLength > 0) {
    rawMessage.meta = buff.slice(offset + HEADER_LENGTH, offset + HEADER_LENGTH + metaLength)
  }
  if (payloadLength > 0) {
    rawMessage.payload = buff.slice(offset + HEADER_LENGTH + metaLength, messageLength)
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

  const { topic, action, meta } = rawMessages[0]
  const partialPayloads: Array<Buffer> = []
  rawMessages.forEach(({ payload: partial }) => {
    if (partial) {
      partialPayloads.push(partial)
    }
  })
  const payload = Buffer.concat(partialPayloads)
  return { fin: true, topic, action, meta, payload }
}

function parseMessage (rawMessage: RawMessage): ParseResult {
  const { topic: rawTopic, action: rawAction } = rawMessage
  if (TOPIC_BYTE_TO_KEY[rawTopic] === undefined) {
    return {
      kind: 'ParseError',
      description: `unknown topic ${rawTopic}`,
    }
  }
  const topic: TOPIC = rawTopic
  if (ACTIONS_BYTE_TO_KEY[topic][rawAction] === undefined) {
    return {
      kind: 'ParseError',
      description: `unknown ${topic} action ${rawAction}`,
    }
  }
  const action: Message['action'] = rawAction & 0x7F

  const message: GenericMessage = { kind: 'Message', topic, action }

  if (rawMessage.meta && rawMessage.meta.length > 0) {
    const meta = parseJSON(rawMessage.meta)
    if (!meta || typeof meta !== 'object') {
      return {
        kind: 'ParseError',
        description: `invalid meta field ${rawMessage.meta.toString()}`,
        parsedMessage: message,
      }
    }
    addMetadataToMessage(meta, message)
  }

  message.data = rawMessage.payload
/*
 *  if (rawMessage.payload && rawMessage.payload.length > 0) {
 *    const payload = parseJSON(rawMessage.payload)
 *    if (payload === undefined) {
 *      return {
 *        kind: 'ParseError',
 *        description: `invalid message data ${rawMessage.payload.toString()}`,
 *        parsedMessage: message,
 *      }
 *    }
 *    message.data = payload
 *  }
 */

  message.isAck = rawAction >= 0x80
  message.isError = (rawAction >= 0x60 && rawAction < 0x70) || rawTopic === TOPIC.PARSER

  const isRecordWrite = message.topic === TOPIC.RECORD
    && rawAction >= 0x10
    && rawAction < 0x20
  if (isRecordWrite) {
    message.isWriteAck = isWriteAck(message.action)
    if (message.isWriteAck) {
      message.action = writeAckToAction[message.action]
    }
  }

  return message
}

export interface GenericMessage {
  kind: 'Message'
  topic: TOPIC
  action: RECORD_ACTIONS | PRESENCE_ACTIONS | RPC_ACTIONS | EVENT_ACTIONS | AUTH_ACTIONS | CONNECTION_ACTIONS
  name?: string

  isError?: boolean
  isAck?: boolean

  data?: Buffer
  parsedData?: any

  raw?: Buffer

  isWriteAck?: boolean
  correlationId?: string
  path?: string
  version?: number
}

interface ParseError {
  kind: 'ParseError'

  parsedMessage?: GenericMessage
  description?: string
}

type ParseResult = GenericMessage | ParseError

function addMetadataToMessage (meta: object, message: GenericMessage) {
  for (const key in ARGUMENTS) {
    const value = meta[ARGUMENTS[key]]
    if (value !== undefined) {
      message[key] = value
    }
  }
}

function parseJSON (buff: Buffer) {
  try {
    return JSON.parse(buff.toString())
  } catch (err) {
    return undefined
  }
}
