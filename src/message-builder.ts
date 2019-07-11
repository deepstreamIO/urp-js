import {
  TopicMessage
} from './protobuf-map'

// @ts-ignore
import { Message } from '../generated/protobuf'

export function getMessage (message: any, isAck: boolean): Uint8Array {
  if (isAck && message.isAck === false) {
    message = { ...message, isAck: true }
  }
  if (message.data === undefined && message.parsedData !== undefined) {
    message.data = JSON.stringify(message.parsedData)
  }

  const serializedMessage = TopicMessage[message.topic].encode(message).finish()
  const m =  Message.encodeDelimited({ topic: message.topic, message: serializedMessage }).finish()
  return m
}
