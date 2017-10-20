/* tslint:disable:no-bitwise */
import {
  ACTIONS_TEXT_TO_BYTE,
  AUTH_ACTIONS as AA,
  CONNECTION_ACTIONS as CA,
  DEEPSTREAM_TYPES as TYPES,
  EVENT_ACTIONS as EA,
  MESSAGE_PART_SEPERATOR,
  MESSAGE_SEPERATOR,
  PAYLOAD_ENCODING,
  PRESENCE_ACTIONS as UA,
  RECORD_ACTIONS as RA,
  RPC_ACTIONS as PA,
  TOPIC,
  TOPIC_TEXT_TO_BYTE,
} from '../../text/src/constants'

import {
  ARGUMENTS,
  HEADER_LENGTH,
  MAX_ARGS_LENGTH,
  PAYLOAD_OVERFLOW_LENGTH,
} from './constants'

export function parse (buffer: Buffer): Array<Message> {
  return []
}

interface GenericMessage {
  topic: TOPIC
  action: RECORD_ACTIONS | PRESENCE_ACTIONS | RPC_ACTIONS | EVENT_ACTIONS | AUTH_ACTIONS | CONNECTION_ACTIONS
  name?: string

  isError?: boolean
  isAck?: boolean

  data?: string
  parseError?: boolean
  parsedData?: any

  raw?: string

  isWriteAck?: boolean
  correlationId?: string
  path?: string
  version?: number
}

function tryParseBinaryMsg (buff: Buffer): { message?: GenericMessage, bytesConsumed: number, fin: boolean } | null {
  // parse header
  if (buff.length < HEADER_LENGTH) {
    return null
  }
  const fin: boolean = !!(buff[0] & 0x80)
  const topic: TOPIC = buff[0] & 0x7F
  const action: Message['action'] = buff[1]
  const isAck = action
  const metaLength = buff.readUIntBE(2, 3)
  const payloadLength = buff.readUIntBE(5, 3)
  const messageLength = HEADER_LENGTH + metaLength + payloadLength

  if (buff.length < messageLength) {
    return null
  }

  if (metaLength === 0 && payloadLength === 0) {
    return {
      message: {
        topic,
        action,
      },
      bytesConsumed: messageLength,
      fin,
    }
  }

  const message: GenericMessage = { topic, action }

  if (metaLength > 0) {
    const metaBuff = buff.slice(HEADER_LENGTH, HEADER_LENGTH + metaLength)
    const meta = parseJSON(metaBuff)
    if (typeof meta !== 'object') {
      throw new Error(`Meta object formatted incorrectly: ${metaBuff.toString()}`)
    }
    addMetadataToMessage(meta, message)
  }

  if (payloadLength > 0) {
    const payloadBuff = buff.slice(HEADER_LENGTH + metaLength, messageLength)
    const payload = parseJSON(payloadBuff)
    if (payload !== undefined) {
      message.data = payload
    }
  }

  return { message, bytesConsumed: messageLength, fin }
}

function addMetadataToMessage (meta: object, message: GenericMessage) {
  const name = meta[ARGUMENTS.name]
  if (name !== undefined) {
    message.name = name
  }
  const correlationId = meta[ARGUMENTS.correlationId]
  if (correlationId !== undefined) {
    message.correlationId = correlationId
  }
  const path = meta[ARGUMENTS.path]
  if (path !== undefined) {
    message.path = path
  }
  const version = meta[ARGUMENTS.version]
  if (version !== undefined) {
    message.version = version
  }
}

function parseJSON (buff: Buffer) {
  try {
    return JSON.parse(buff.toString())
  } catch (err) {
    return undefined
  }
}
