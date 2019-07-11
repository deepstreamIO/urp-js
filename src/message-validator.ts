// import {
//   TOPIC as T,
//   CONNECTION_ACTION as CA,
//   EVENT_ACTION as EA,
//   PARSER_ACTION as XA,
//   AUTH_ACTION as AA,
//   RPC_ACTION as PA,
//   RECORD_ACTION as RA,
//   PRESENCE_ACTION as UA,
//   CLUSTER_ACTION as CLA,
//   STATE_ACTION as SA,
// } from '../generated/protobuf'

// /*
//  * Specification of  fields within Meta Params used for message validation
//  * (see `validateMeta`)
//  *
//  * META_PARAMS_SPEC[topic'][action'] => [required, optional]
//  * The keys in `required` must be present in all instances of the message
//  * The keys in `optional` may be present in some instances of the message
//  */
// export const META_PARAMS_SPEC: { [topic: number]: { [action: number]: [Array<string>, Array<string>] } } = {
//   [T.PARSER]: {
//     [XA.UNKNOWN_TOPIC]: [['originalTopic'], []],
//     [XA.UNKNOWN_ACTION]: [['originalTopic', 'originalAction'], []],
//     [XA.INVALID_MESSAGE]: [[], []],
//     [XA.INVALID_META_PARAMS]: [['originalTopic', 'originalAction'], []],
//   },
//   [T.CONNECTION]: {
//     [CA.PING]: [[], []],
//     [CA.PONG]: [[], []],
//     [CA.CHALLENGE]: [['url', 'protocolVersion'], []],
//     [CA.ACCEPT]: [[], []],
//     [CA.REJECT]: [[], []],
//     [CA.REDIRECT]: [['url'], []],
//     [CA.CLOSING]: [[], []],
//     [CA.CLOSED]: [[], []],
//     [CA.ERROR]: [[], []],
//     [CA.AUTHENTICATION_TIMEOUT]: [[], []],
//     [CA.INVALID_MESSAGE]: [['originalTopic', 'originalAction'], []],
//   },
//   [T.AUTH]: {
//     [AA.REQUEST]: [[], []],
//     [AA.AUTH_SUCCESSFUL]: [[], []],
//     [AA.AUTH_UNSUCCESSFUL]: [[], []],
//     [AA.TOO_MANY_AUTH_ATTEMPTS]: [[], []],
//     [AA.INVALID_MESSAGE]: [['originalTopic', 'originalAction'], []],
//     [AA.INVALID_MESSAGE_DATA]: [['originalAction'], []],
//   },
//   [T.RECORD]: {
//     [RA.SUBSCRIBE]: [['names'], []],
//     [RA.UNSUBSCRIBE]: [['names'], []],
//     [RA.MULTIPLE_SUBSCRIPTIONS]: [['name'], ['originalAction']],
//     [RA.NOT_SUBSCRIBED]: [['name'], []],
//     [RA.HEAD]: [['name'], []],
//     [RA.HEAD_BULK]: [['names'], []],
//     [RA.HEAD_RESPONSE]: [['name', 'version'], []],
//     [RA.HEAD_RESPONSE_BULK]: [['versions'], []],
//     [RA.READ]: [['name'], []],
//     [RA.SUBSCRIBEANDHEAD]: [['names'], []],
//     [RA.SUBSCRIBEANDREAD]: [['names'], []],
//     [RA.READ_RESPONSE]: [['name', 'version'], []],
//     [RA.UPDATE]: [['name', 'version'], []],
//     [RA.PATCH]: [['name', 'version', 'path'], []],
//     [RA.ERASE]: [['name', 'version', 'path'], []],
//     [RA.CREATEANDUPDATE]: [['name', 'version'], []],
//     [RA.CREATEANDPATCH]: [['name', 'version', 'path'], []],
//     [RA.DELETE]: [['name'], []],
//     [RA.DELETE_SUCCESS]: [['name'], []],
//     [RA.DELETED]: [['name'], []],
//     [RA.SUBSCRIBECREATEANDREAD]: [['names'], []],
//     [RA.SUBSCRIPTION_HAS_PROVIDER]: [['name'], []],
//     [RA.SUBSCRIPTION_HAS_NO_PROVIDER]: [['name'], []],
//     [RA.WRITE_ACKNOWLEDGEMENT]: [['name', 'correlationId'], []],
//     [RA.VERSION_EXISTS]: [['name', 'version'], ['originalAction']],
//     [RA.CACHE_RETRIEVAL_TIMEOUT]: [['name'], []],
//     [RA.STORAGE_RETRIEVAL_TIMEOUT]: [['name'], []],
//     [RA.RECORD_LOAD_ERROR]: [['name'], []],
//     [RA.RECORD_CREATE_ERROR]: [['name'], ['correlationId', 'originalAction']],
//     [RA.RECORD_UPDATE_ERROR]: [['name'], ['correlationId', 'originalAction']],
//     [RA.RECORD_DELETE_ERROR]: [['name'], []],
//     [RA.RECORD_NOT_FOUND]: [['name', 'originalAction'], []],
//     [RA.INVALID_VERSION]: [['name', 'originalAction'], ['correlationId']],
//     [RA.INVALID_PATCH_ON_HOTPATH]: [['name', 'originalAction'], ['correlationId']],
//     [RA.LISTEN]: [['name'], []],
//     [RA.UNLISTEN]: [['name'], []],
//     [RA.SUBSCRIPTION_FOR_PATTERN_FOUND]: [['name', 'subscription'], []],
//     [RA.SUBSCRIPTION_FOR_PATTERN_REMOVED]: [['name', 'subscription'], []],
//     [RA.LISTEN_ACCEPT]: [['name', 'subscription'], []],
//     [RA.LISTEN_REJECT]: [['name', 'subscription'], []],
//     [RA.INVALID_LISTEN_REGEX]: [['name'], []],
//     [RA.LISTEN_RESPONSE_TIMEOUT]: [['subscription'], []],
//     [RA.MESSAGE_PERMISSION_ERROR]: [['originalAction', 'name'], ['correlationId']],
//     [RA.MESSAGE_DENIED]: [['originalAction', 'name'], ['correlationId']],
//     [RA.INVALID_MESSAGE_DATA]: [['originalAction', 'name'], ['correlationId']],
//   },
//   [T.RPC]: {
//     [PA.REQUEST_ERROR]: [['name', 'correlationId'], ['reason']],
//     [PA.REQUEST]: [['name', 'correlationId'], ['requestorName', 'requestorData', 'trustedSender']],
//     [PA.ACCEPT]: [['name', 'correlationId'], []],
//     [PA.REJECT]: [['name', 'correlationId'], []],
//     [PA.RESPONSE]: [['name', 'correlationId'], []],
//     [PA.PROVIDE]: [['names'], []],
//     [PA.UNPROVIDE]: [['names'], []],
//     [PA.MULTIPLE_PROVIDERS]: [['correlationId'], []],
//     [PA.NOT_PROVIDED]: [['correlationId'], []],
//     [PA.MULTIPLE_RESPONSE]: [['name', 'correlationId'], []],
//     [PA.RESPONSE_TIMEOUT]: [['name', 'correlationId'], []],
//     [PA.INVALID_RPC_CORRELATION_ID]: [['name', 'correlationId', 'originalAction'], []],
//     [PA.MULTIPLE_ACCEPT]: [['name', 'correlationId'], []],
//     [PA.ACCEPT_TIMEOUT]: [['name', 'correlationId'], []],
//     [PA.NO_RPC_PROVIDER]: [['name', 'correlationId'], []],
//     [PA.MESSAGE_PERMISSION_ERROR]: [['originalAction'], ['name', 'correlationId']],
//     [PA.MESSAGE_DENIED]: [['originalAction'], ['name', 'correlationId']],
//     [PA.INVALID_MESSAGE_DATA]: [['originalAction'], ['name', 'correlationId']],
//   },
//   [T.EVENT]: {
//     [EA.EMIT]: [['name'], []],
//     [EA.SUBSCRIBE]: [['names'], []],
//     [EA.UNSUBSCRIBE]: [['names'], []],
//     [EA.MULTIPLE_SUBSCRIPTIONS]: [['name'], []],
//     [EA.NOT_SUBSCRIBED]: [['name'], []],
//     [EA.MESSAGE_PERMISSION_ERROR]: [['originalAction', 'name'], []],
//     [EA.MESSAGE_DENIED]: [['originalAction', 'name'], []],
//     [EA.LISTEN]: [['name'], []],
//     [EA.UNLISTEN]: [['name'], []],
//     [EA.SUBSCRIPTION_FOR_PATTERN_FOUND]: [['name', 'subscription'], []],
//     [EA.SUBSCRIPTION_FOR_PATTERN_REMOVED]: [['name', 'subscription'], []],
//     [EA.LISTEN_ACCEPT]: [['name', 'subscription'], []],
//     [EA.LISTEN_REJECT]: [['name', 'subscription'], []],
//     [EA.INVALID_LISTEN_REGEX]: [['name'], []],
//     [EA.LISTEN_RESPONSE_TIMEOUT]: [['subscription'], []],
//     [EA.MESSAGE_PERMISSION_ERROR]: [['originalAction', 'name'], []],
//     [EA.MESSAGE_DENIED]: [['originalAction', 'name'], []],
//     [EA.INVALID_MESSAGE_DATA]: [['name', 'originalAction'], []],
//   },
//   [T.PRESENCE]: {
//     [UA.SUBSCRIBE]: [['names', 'correlationId'], []],
//     [UA.SUBSCRIBE_ALL]: [[], []],
//     [UA.UNSUBSCRIBE]: [['names', 'correlationId'], []],
//     [UA.UNSUBSCRIBE_ALL]: [['correlationId'], []],
//     [UA.NOT_SUBSCRIBED]: [[], ['correlationId']],
//     [UA.MULTIPLE_SUBSCRIPTIONS]: [[], ['correlationId', 'name', 'originalAction']],
//     [UA.QUERY]: [['correlationId', 'names'], []],
//     [UA.QUERY_RESPONSE]: [['correlationId'], []],
//     [UA.QUERY_ALL]: [[], []],
//     [UA.QUERY_ALL_RESPONSE]: [['names'], []],
//     [UA.PRESENCE_JOIN]: [['name'], []],
//     [UA.PRESENCE_LEAVE]: [['name'], []],
//     [UA.PRESENCE_JOIN_ALL]: [['name'], []],
//     [UA.PRESENCE_LEAVE_ALL]: [['name'], []],
//     [UA.INVALID_PRESENCE_USERS]: [[], []],
//     [UA.MESSAGE_PERMISSION_ERROR]: [['originalAction', 'name'], ['correlationId']],
//     [UA.MESSAGE_DENIED]: [['originalAction'], ['correlationId', 'name']],
//   },
//   [T.CLUSTER]: {
//     [CLA.STATUS]: [['serverName', 'leaderScore'], []],
//     [CLA.REMOVE]: [['serverName'], []],
//   },
//   [T.STATE_REGISTRY]: {
//     [SA.ERROR]: [['registryTopic'], []],
//     [SA.ADD]: [['registryTopic'], []],
//     [SA.REMOVE]: [['registryTopic'], []],
//     [SA.REQUEST_FULL_STATE]: [['registryTopic'], []],
//     [SA.FULL_STATE]: [['registryTopic'], []]
//   },
//   [T.LOCK]: {
//   }
// }

// const payloadMap = {
//   [T.PARSER]: [
//     XA.MESSAGE_PARSE_ERROR,
//     XA.INVALID_META_PARAMS,
//   ],
//   [T.AUTH]: [
//     AA.REQUEST,
//     AA.AUTH_SUCCESSFUL,
//     AA.AUTH_UNSUCCESSFUL,
//   ],
//   [T.RECORD]: [
//     RA.READ_RESPONSE,
//     RA.UPDATE,
//     RA.PATCH,
//     RA.CREATEANDUPDATE,
//     RA.CREATEANDPATCH,
//     RA.VERSION_EXISTS,
//   ],
//   [T.RPC]: [
//     PA.REQUEST,
//     PA.RESPONSE,
//     PA.REQUEST_ERROR
//   ],
//   [T.EVENT]: [
//     EA.EMIT,
//   ],
//   [T.PRESENCE]: [
//     UA.QUERY_RESPONSE,
//   ],
//   [T.CLUSTER]: [
//   ],
//   [T.STATE_REGISTRY]: [
//   ],
//   [T.LOCK]: [
//   ]
// }

// // export const hasPayload = (topic: T, action: ALL_ACTIONS) =>
// //     mapOfArraysHas(payloadMap, topic, action)

// // export function validateUnkownMeta (topic: TOPIC, action: ALL_ACTIONS, meta: { [key: string]: any }): string | undefined {
// //   const spec = META_PARAMS_SPEC[topic][action]
// //   if (!spec) {
// //     return 'no meta spec'
// //   }
// //   const [required, optional] = spec
// //   for (const key in meta) {
// //     if (meta[key] !== undefined
// //         && required.indexOf(key as M) === -1
// //         && optional.indexOf(key as M) === -1) {
// //       return `meta object has unknown key ${key}`
// //     }
// //   }
// //   return
// // }

// // export function validateMeta (topic: TOPIC, action: ALL_ACTIONS, meta: { [key: string]: any }): string | undefined {
// //   const spec = META_PARAMS_SPEC[topic][action]
// //   if (!spec) {
// //     return 'no meta spec'
// //   }
// //   const [required, ] = spec
// //   for (const req of required) {
// //     if (meta[req] === undefined) {
// //       return `meta object does not have required key ${req}`
// //     }
// //   }
// //   return
// // }
