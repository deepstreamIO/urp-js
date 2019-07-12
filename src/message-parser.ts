import { TopicMessage } from './protobuf-map'
import { ParseResult } from '../types/messages'
// @ts-ignore
import { Message } from '../generated/protobuf'

export interface RawMessage {
  fin: boolean
  topic: number
  action: number
  meta?: Buffer
  payload?: Buffer
  rawHeader: Buffer
}

export function parse (data: Uint8Array): Array<ParseResult> {
  const msg = Message.decodeDelimited(data)
  const message = TopicMessage[msg.topic].decode(msg.message, msg.message.length)
  return [{ topic: msg.topic, ...message }]
}

export function parseData (message: any): true | Error {
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

export function parseJSON (buff: Buffer): any {
  try {
    return JSON.parse(buff.toString())
  } catch (err) {
    return undefined
  }
}
