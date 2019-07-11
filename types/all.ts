export { TOPIC } from '../types/general'
export { RECORD_ACTION } from '../types/record'
export { AUTH_ACTION } from '../types/auth'
export { EVENT_ACTION } from '../types/event'
export { RPC_ACTION } from '../types/rpc'
export { PRESENCE_ACTION } from '../types/presence'
export { CONNECTION_ACTION } from '../types/connection'
export { CLUSTER_ACTION } from '../types/cluster'
export { LOCK_ACTION } from '../types/lock'
export { PARSER_ACTION } from '../types/parser'
export { MONITORING_ACTION } from '../types/monitoring'
export { STATE_ACTION, STATE_REGISTRY_TOPIC } from '../types/state'

export type JSONPrimitive = string | number | boolean | null
export interface JSONObject {
    [member: string]: JSONValue
}
export interface JSONArray extends Array<JSONValue> {}
export type JSONValue = JSONPrimitive | JSONObject | JSONArray

export type RecordPathData = JSONValue
export type RecordData = JSONObject | Array<string> | null | undefined
export type RPCResult = JSONValue
export type EventData = JSONValue
export type AuthData = JSONObject
