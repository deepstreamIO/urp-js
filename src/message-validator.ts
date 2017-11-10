import {
  TOPIC,
  ALL_ACTIONS,
  CONNECTION_ACTIONS as CA,
  EVENT_ACTIONS as EA,
  PARSER_ACTIONS as XA,
  AUTH_ACTIONS as AA,
  RPC_ACTIONS as PA,
  RECORD_ACTIONS as RA,
  PRESENCE_ACTIONS as UA,
  Message,
} from './message-constants'

const payloadMap = {
  [TOPIC.PARSER]: [
    XA.MESSAGE_PARSE_ERROR,
    XA.INVALID_META_PARAMS,
  ],
  [TOPIC.AUTH]: [
    AA.REQUEST,
    AA.AUTH_SUCCESSFUL,
    AA.AUTH_UNSUCCESSFUL,
  ],
  [TOPIC.RECORD]: [
    RA.READ_RESPONSE,
    RA.UPDATE,
    RA.UPDATE_WITH_WRITE_ACK,
    RA.PATCH,
    RA.PATCH_WITH_WRITE_ACK,
    RA.CREATEANDUPDATE,
    RA.CREATEANDUPDATE_WITH_WRITE_ACK,
    RA.CREATEANDPATCH,
    RA.CREATEANDPATCH_WITH_WRITE_ACK,
    RA.WRITE_ACKNOWLEDGEMENT,
    RA.VERSION_EXISTS,
  ],
  [TOPIC.RPC]: [
    PA.REQUEST,
    PA.RESPONSE,
  ],
  [TOPIC.EVENT]: [
    EA.EMIT,
  ],
  [TOPIC.PRESENCE]: [
    UA.SUBSCRIBE,
    UA.UNSUBSCRIBE,
    UA.QUERY,
    UA.QUERY_RESPONSE,
    UA.QUERY_ALL_RESPONSE,
  ]
}

const corrIdMap = {
  [TOPIC.RPC]: [
    PA.REQUEST,
    PA.REQUEST_ERROR,
    PA.ACCEPT,
    PA.REJECT,
    PA.RESPONSE,
    PA.MULTIPLE_RESPONSE,
    PA.RESPONSE_TIMEOUT,
    PA.INVALID_RPC_CORRELATION_ID,
    PA.MULTIPLE_ACCEPT,
    PA.ACCEPT_TIMEOUT,
    PA.NO_RPC_PROVIDER,
    PA.MESSAGE_PERMISSION_ERROR,
    PA.MESSAGE_DENIED,
    PA.INVALID_MESSAGE_DATA,
    PA.MULTIPLE_PROVIDERS,
    PA.NOT_PROVIDED,
  ],
  [TOPIC.PRESENCE]: [
    UA.QUERY,
    UA.QUERY_RESPONSE,
    UA.SUBSCRIBE,
    UA.SUBSCRIBE_ACK,
    UA.SUBSCRIBE_ALL,
    UA.SUBSCRIBE_ALL_ACK,
    UA.UNSUBSCRIBE,
    UA.UNSUBSCRIBE_ACK,
    UA.UNSUBSCRIBE_ALL,
    UA.UNSUBSCRIBE_ALL_ACK,
  ]
}

const ackMap = {
  [TOPIC.EVENT]: [
    EA.SUBSCRIBE,
    EA.UNSUBSCRIBE,
    EA.LISTEN,
    EA.UNLISTEN,
  ],
  [TOPIC.RECORD]: [
    RA.SUBSCRIBE,
    RA.UNSUBSCRIBE,
    RA.LISTEN,
    RA.UNLISTEN,
    RA.DELETE,
  ],
  [TOPIC.PRESENCE]: [
    UA.SUBSCRIBE,
    UA.UNSUBSCRIBE,
    UA.SUBSCRIBE_ALL,
    UA.UNSUBSCRIBE_ALL,
  ],
  [TOPIC.RPC]: [
    PA.PROVIDE,
    PA.UNPROVIDE,
  ],
}

function mapOfArraysHas (
  map: { [key: number]: Array<ALL_ACTIONS> },
  topic: TOPIC,
  action: ALL_ACTIONS
): boolean {
  const actions = map[topic]
  if (!actions) {
    return false
  }
  return actions.indexOf(action) !== -1
}

export const hasCorrelationId = (topic: TOPIC, action: ALL_ACTIONS) =>
  mapOfArraysHas(corrIdMap, topic, action)

export const hasAck = (topic: TOPIC, action: ALL_ACTIONS) =>
  mapOfArraysHas(ackMap, topic, action)

export const hasPayload = (topic: TOPIC, action: ALL_ACTIONS) =>
  mapOfArraysHas(payloadMap, topic, action)

export function validate (message: Message): string | undefined {
  let action = message.action
  if (message.isAck) {
    if (!hasAck(message.topic, message.action)) {
      return 'should not have an ack'
    }
    action = message.action + 0x80
  }

  /* errors e.g. MESSAGE_DENIED have might have different params dependent on the parameters of the
   * original message
   */
  if (action >= 0x60 && action < 0x70) {
    return
  }

  const shouldHaveCorrelationId = hasCorrelationId(message.topic, action)
  if (!!message.correlationId !== shouldHaveCorrelationId) {
    return `should ${shouldHaveCorrelationId ? '' : 'not '}have a correlationId`
  }
  return
}
