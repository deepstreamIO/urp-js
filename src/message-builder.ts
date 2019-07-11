import {
  TopicMessage
} from './protobuf-map'

export function getMessage (message: any, isAck: boolean): Uint8Array {
  if (isAck && message.isAck === false) {
    message = { ...message, isAck: true }
  }
  if (message.data === undefined && message.parsedData !== undefined) {
    message.data = JSON.stringify(message.parsedData)
  }
  return TopicMessage[message.topic].encodeDelimited(message).finish()
}
