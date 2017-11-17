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
  META_KEYS as M,
} from './message-constants'

/*
 * Specification of  fields within Meta Params used for message validation
 * (see `validateMeta`)
 *
 * META_PARAMS_SPEC[topic][action] => [required, optional]
 * The keys in `required` must be present in all instances of the message
 * The keys in `optional` may be present in some instances of the message
 */
export const META_PARAMS_SPEC: { [topic: number]: { [action: number]: [Array<M>, Array<M>] } } = {
  [TOPIC.PARSER]: {
    [XA.UNKNOWN_TOPIC]: [[M.originalTopic], []],
    [XA.UNKNOWN_ACTION]: [[M.originalTopic, M.originalAction], []],
    [XA.INVALID_MESSAGE]: [[], []],
    [XA.INVALID_META_PARAMS]: [[M.originalTopic, M.originalAction], []],
  },
  [TOPIC.CONNECTION]: {
    [CA.PING]: [[], []],
    [CA.PONG]: [[], []],
    [CA.CHALLENGE]: [[], []],
    [CA.CHALLENGE_RESPONSE]: [[], [M.url]],
    [CA.ACCEPT]: [[], []],
    [CA.REJECT]: [[], []],
    [CA.REDIRECT]: [[M.url], []],
    [CA.CLOSING]: [[], []],
    [CA.CLOSED]: [[], []],
    [CA.ERROR]: [[], []],
    [CA.AUTHENTICATION_TIMEOUT]: [[], []],
    [CA.INVALID_MESSAGE]: [[M.originalTopic, M.originalAction], []],
  },
  [TOPIC.AUTH]: {
    [AA.REQUEST]: [[], []],
    [AA.AUTH_SUCCESSFUL]: [[], []],
    [AA.AUTH_UNSUCCESSFUL]: [[], []],
    [AA.TOO_MANY_AUTH_ATTEMPTS]: [[], []],
    [AA.INVALID_MESSAGE]: [[M.originalTopic, M.originalAction], []],
    [AA.INVALID_MESSAGE_DATA]: [[M.originalAction], []],
  },
  [TOPIC.RECORD]: {
    [RA.SUBSCRIBE]: [[M.name], []],
    [RA.SUBSCRIBE_ACK]: [[M.name], []],
    [RA.UNSUBSCRIBE]: [[M.name], []],
    [RA.UNSUBSCRIBE_ACK]: [[M.name], []],
    [RA.MULTIPLE_SUBSCRIPTIONS]: [[M.name, M.originalAction], []],
    [RA.NOT_SUBSCRIBED]: [[M.name, M.originalAction], []],
    [RA.HEAD]: [[M.name], []],
    [RA.SUBSCRIBEANDHEAD]: [[M.name], []],
    [RA.HEAD_RESPONSE]: [[M.name, M.version], []],
    [RA.READ]: [[M.name], []],
    [RA.SUBSCRIBEANDREAD]: [[M.name], []],
    [RA.READ_RESPONSE]: [[M.name, M.version], []],
    [RA.UPDATE]: [[M.name, M.version], []],
    [RA.UPDATE_WITH_WRITE_ACK]: [[M.name, M.version, M.correlationId], []],
    [RA.PATCH]: [[M.name, M.version, M.path], []],
    [RA.PATCH_WITH_WRITE_ACK]: [[M.name, M.version, M.path, M.correlationId], []],
    [RA.ERASE]: [[M.name, M.version, M.path], []],
    [RA.ERASE_WITH_WRITE_ACK]: [[M.name, M.version, M.path, M.correlationId], []],
    [RA.CREATEANDUPDATE]: [[M.name, M.version], []],
    [RA.SUBSCRIBECREATEANDUPDATE]: [[M.name, M.version], []],
    [RA.CREATEANDUPDATE_WITH_WRITE_ACK]: [[M.name, M.version, M.correlationId], []],
    [RA.CREATEANDPATCH]: [[M.name, M.version, M.path], []],
    [RA.CREATEANDPATCH_WITH_WRITE_ACK]: [[M.name, M.version, M.path, M.correlationId], []],
    [RA.DELETE]: [[M.name], []],
    [RA.DELETE_SUCCESS]: [[M.name], []],
    [RA.DELETED]: [[M.name], []],
    [RA.SUBSCRIBECREATEANDREAD]: [[M.name], []],
    [RA.SUBSCRIPTION_HAS_PROVIDER]: [[M.name], []],
    [RA.SUBSCRIPTION_HAS_NO_PROVIDER]: [[M.name], []],
    [RA.WRITE_ACKNOWLEDGEMENT]: [[M.name, M.correlationId], []],
    [RA.VERSION_EXISTS]: [[M.name, M.version], []],
    [RA.CACHE_RETRIEVAL_TIMEOUT]: [[M.name], []],
    [RA.STORAGE_RETRIEVAL_TIMEOUT]: [[M.name], []],
    [RA.RECORD_LOAD_ERROR]: [[M.name], []],
    [RA.RECORD_CREATE_ERROR]: [[M.name], [M.correlationId, M.originalAction]],
    [RA.RECORD_UPDATE_ERROR]: [[M.name], [M.correlationId, M.originalAction]],
    [RA.RECORD_DELETE_ERROR]: [[M.name], []],
    [RA.RECORD_NOT_FOUND]: [[M.name, M.originalAction], []],
    [RA.INVALID_VERSION]: [[M.name, M.originalAction], [M.correlationId]],
    [RA.INVALID_PATCH_ON_HOTPATH]: [[M.name], [M.correlationId]],
    [RA.LISTEN]: [[M.name], []],
    [RA.LISTEN_ACK]: [[M.name], []],
    [RA.UNLISTEN]: [[M.name], []],
    [RA.UNLISTEN_ACK]: [[M.name], []],
    [RA.SUBSCRIPTION_FOR_PATTERN_FOUND]: [[M.name, M.subscription], []],
    [RA.SUBSCRIPTION_FOR_PATTERN_REMOVED]: [[M.name, M.subscription], []],
    [RA.LISTEN_ACCEPT]: [[M.name, M.subscription], []],
    [RA.LISTEN_REJECT]: [[M.name, M.subscription], []],
    [RA.INVALID_LISTEN_REGEX]: [[M.name], []],
    [RA.MESSAGE_PERMISSION_ERROR]: [[M.originalAction, M.name], [M.correlationId]],
    [RA.MESSAGE_DENIED]: [[M.originalAction, M.name], [M.correlationId]],
    [RA.INVALID_MESSAGE_DATA]: [[M.originalAction, M.name], [M.correlationId]],
  },
  [TOPIC.RPC]: {
    [PA.REQUEST_ERROR]: [[M.name, M.correlationId], [M.reason]],
    [PA.REQUEST]: [[M.name, M.correlationId], []],
    [PA.ACCEPT]: [[M.name, M.correlationId], []],
    [PA.REJECT]: [[M.name, M.correlationId], []],
    [PA.RESPONSE]: [[M.name, M.correlationId], []],
    [PA.PROVIDE]: [[M.name], []],
    [PA.PROVIDE_ACK]: [[M.name], []],
    [PA.UNPROVIDE]: [[M.name], []],
    [PA.UNPROVIDE_ACK]: [[M.name], []],
    [PA.MULTIPLE_PROVIDERS]: [[M.correlationId], []],
    [PA.NOT_PROVIDED]: [[M.correlationId], []],
    [PA.MULTIPLE_RESPONSE]: [[M.name, M.correlationId], []],
    [PA.RESPONSE_TIMEOUT]: [[M.name, M.correlationId], []],
    [PA.INVALID_RPC_CORRELATION_ID]: [[M.name, M.correlationId], []],
    [PA.MULTIPLE_ACCEPT]: [[M.name, M.correlationId], []],
    [PA.ACCEPT_TIMEOUT]: [[M.name, M.correlationId], []],
    [PA.NO_RPC_PROVIDER]: [[M.name, M.correlationId], []],
    [PA.MESSAGE_PERMISSION_ERROR]: [[M.originalAction], [M.name, M.correlationId]],
    [PA.MESSAGE_DENIED]: [[M.originalAction], [M.name, M.correlationId]],
    [PA.INVALID_MESSAGE_DATA]: [[M.originalAction], [M.name, M.correlationId]],
  },
  [TOPIC.EVENT]: {
    [EA.EMIT]: [[M.name], []],
    [EA.SUBSCRIBE]: [[M.name], []],
    [EA.SUBSCRIBE_ACK]: [[M.name], []],
    [EA.UNSUBSCRIBE]: [[M.name], []],
    [EA.UNSUBSCRIBE_ACK]: [[M.name], []],
    [EA.MULTIPLE_SUBSCRIPTIONS]: [[M.name, M.originalAction], []],
    [EA.NOT_SUBSCRIBED]: [[M.name, M.originalAction], []],
    [EA.MESSAGE_PERMISSION_ERROR]: [[M.originalAction, M.name], []],
    [EA.MESSAGE_DENIED]: [[M.originalAction, M.name], []],
    [EA.LISTEN]: [[M.name], []],
    [EA.LISTEN_ACK]: [[M.name], []],
    [EA.UNLISTEN]: [[M.name], []],
    [EA.UNLISTEN_ACK]: [[M.name], []],
    [EA.SUBSCRIPTION_FOR_PATTERN_FOUND]: [[M.name, M.subscription], []],
    [EA.SUBSCRIPTION_FOR_PATTERN_REMOVED]: [[M.name, M.subscription], []],
    [EA.LISTEN_ACCEPT]: [[M.name, M.subscription], []],
    [EA.LISTEN_REJECT]: [[M.name, M.subscription], []],
    [EA.INVALID_LISTEN_REGEX]: [[M.name], []],
    [EA.MESSAGE_PERMISSION_ERROR]: [[M.originalAction, M.name], []],
    [EA.MESSAGE_DENIED]: [[M.originalAction, M.name], []],
    [EA.INVALID_MESSAGE_DATA]: [[M.name, M.originalAction], []],
  },
  [TOPIC.PRESENCE]: {
    [UA.SUBSCRIBE]: [[M.correlationId, M.names], []],
    [UA.SUBSCRIBE_ACK]: [[M.correlationId], []],
    [UA.SUBSCRIBE_ALL]: [[], []],
    [UA.SUBSCRIBE_ALL_ACK]: [[], []],
    [UA.UNSUBSCRIBE]: [[M.correlationId, M.names], []],
    [UA.UNSUBSCRIBE_ACK]: [[M.correlationId], []],
    [UA.UNSUBSCRIBE_ALL]: [[M.correlationId], []],
    [UA.UNSUBSCRIBE_ALL_ACK]: [[M.correlationId], []],
    [UA.NOT_SUBSCRIBED]: [[], [M.correlationId]],
    [UA.MULTIPLE_SUBSCRIPTIONS]: [[], [M.correlationId]],
    [UA.QUERY]: [[M.correlationId, M.names], []],
    [UA.QUERY_RESPONSE]: [[M.correlationId], []],
    [UA.QUERY_ALL]: [[], []],
    [UA.QUERY_ALL_RESPONSE]: [[M.names], []],
    [UA.PRESENCE_JOIN]: [[M.name], []],
    [UA.PRESENCE_LEAVE]: [[M.name], []],
    [UA.PRESENCE_JOIN_ALL]: [[M.name], []],
    [UA.PRESENCE_LEAVE_ALL]: [[M.name], []],
    [UA.INVALID_PRESENCE_USERS]: [[], []],
    [UA.MESSAGE_PERMISSION_ERROR]: [[M.originalAction, M.name], [M.correlationId]],
    [UA.MESSAGE_DENIED]: [[M.originalAction], [M.correlationId, M.name]],
  }
}

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
    UA.QUERY_RESPONSE,
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

export const hasPayload = (topic: TOPIC, action: ALL_ACTIONS) =>
  mapOfArraysHas(payloadMap, topic, action)

export function validateMeta (topic: TOPIC, action: ALL_ACTIONS, meta: { [key: string]: any }): string | undefined {
  const spec = META_PARAMS_SPEC[topic][action]
  if (!spec) {
    return 'no meta spec'
  }
  const [required, optional] = spec
  for (const key in meta) {
    if (meta[key] !== undefined
      && required.indexOf(key as M) === -1
      && optional.indexOf(key as M) === -1) {
      return `meta object has unknown key ${key}`
    }
  }
  for (const req of required) {
    if (meta[req] === undefined) {
      return `meta object does not have required key ${req}`
    }
  }
  return
}

export function hasCorrelationId (topic: TOPIC, action: ALL_ACTIONS) {
  const spec = META_PARAMS_SPEC[topic][action]
  if (!spec) {
    return
  }
  const [required, optional] = spec
  return (required.indexOf(M.correlationId) !== -1) || (optional.indexOf(M.correlationId) !== -1)
}
