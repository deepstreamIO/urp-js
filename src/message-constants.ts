// tslint:disable no-bitwise

export type ALL_ACTIONS = RECORD_ACTIONS | PRESENCE_ACTIONS | RPC_ACTIONS |
    EVENT_ACTIONS | AUTH_ACTIONS | CONNECTION_ACTIONS | PARSER_ACTIONS | STATE_ACTIONS |
    CLUSTER_ACTIONS | LOCK_ACTIONS

export enum META_KEYS {
    payloadEncoding = 'e',
    name = 'n',
    names = 'm',
    subscription = 's',
    correlationId = 'c',
    version = 'v',
    path = 'p',
    reason = 'r',
    url = 'u',
    originalTopic = 't',
    originalAction = 'a',
    protocolVersion = 'x',
    requestorName = 'rn',
    requestorData = 'rd',
    trustedSender = 'ts',
    registryTopic = 'rt',
    serverName = 'sn',
    leaderScore = 'ls',
    versions = 'vs'
}

export enum PAYLOAD_ENCODING {
    JSON = 'j',
    BINARY = 'b',
}

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

export interface Message {
    topic: TOPIC
    action: ALL_ACTIONS
    name?: string

    isError?: boolean
    isAck?: boolean

    data?: string | Buffer
    parsedData?: RecordData | RPCResult | EventData | AuthData
    payloadEncoding?: PAYLOAD_ENCODING

    parseError?: false

    raw?: string | Buffer

    // listen
    subscription?: string

    originalTopic?: TOPIC
    originalAction?: ALL_ACTIONS
    names?: Array<string>
    reason?: string

    // connection
    url?: string
    protocolVersion?: string

    // record
    isWriteAck?: boolean
    correlationId?: string
    path?: string
    version?: number
    versions?: { [index: string]: number }

    // state
    checksum?: number
    fullState?: Array<string>
    serverName?: string
    registryTopic?: TOPIC

    // cluster
    leaderScore?: number
    externalUrl?: string,
    role?: string

    // lock
    locked?: boolean

}

export interface StateMessage extends Message {
    topic: TOPIC.STATE_REGISTRY,
    registryTopic: TOPIC
}

export interface BulkSubscriptionMessage extends Message {
    names: Array<string>,
    correlationId: string
}

export interface SubscriptionMessage extends Message {
    name: string
}

export interface BulkSubscriptionMessage extends Message {
    names: Array<string>
}

export interface EventMessage extends SubscriptionMessage {
    topic: TOPIC.EVENT
    action: EVENT_ACTIONS
}

export interface RPCMessage extends SubscriptionMessage {
    topic: TOPIC.RPC
    action: RPC_ACTIONS
    correlationId: string
}

export interface PresenceMessage extends Message {
    topic: TOPIC.PRESENCE
    action: PRESENCE_ACTIONS
    correlationId: string
}

export interface ListenMessage extends SubscriptionMessage {
    topic: TOPIC.RECORD | TOPIC.EVENT
    action: RECORD_ACTIONS | EVENT_ACTIONS
    subscription: string
    raw?: string
}

export interface RecordMessage extends SubscriptionMessage {
    topic: TOPIC.RECORD
    action: RECORD_ACTIONS
}

export interface RecordWriteMessage extends RecordMessage {
    topic: TOPIC.RECORD
    version: number
    isWriteAck: boolean
    path?: string
    name: string
}

export interface RecordAckMessage extends RecordMessage {
    topic: TOPIC.RECORD
    path?: string
    data: any
}

export interface MonitoringMessage extends Message {
    topic: TOPIC.MONITORING
}

export interface LockMessage extends Message {
    topic: TOPIC.LOCK
    action: LOCK_ACTIONS
    name: string
    locked: boolean
}

export interface ClusterMessage extends Message {
    topic: TOPIC.CLUSTER
    action: CLUSTER_ACTIONS
    serverName: string,
}

export interface ParseError {
    parseError: boolean
    action: PARSER_ACTIONS

    parsedMessage: Message

    raw?: Buffer

    description?: string
}

export type ParseResult = Message | ParseError

export enum TOPIC {
    ERROR = 0x00,
    PARSER = 0x01,
    CONNECTION = 0x02,
    AUTH = 0x03,
    EVENT = 0x04,
    RECORD = 0x05,
    RPC = 0x06,
    PRESENCE = 0x07,
    MONITORING = 0x08,
    SUBSCRIPTIONS = 0x10,
    ONLINE_USERS = 0x11,
    EVENT_SUBSCRIPTIONS = 0x20,
    RECORD_SUBSCRIPTIONS = 0x21,
    RPC_SUBSCRIPTIONS = 0x22,
    PRESENCE_SUBSCRIPTIONS = 0x23,
    RECORD_LISTEN_PATTERNS = 0x24,
    EVENT_LISTEN_PATTERNS = 0x25,
    RECORD_PUBLISHED_SUBSCRIPTIONS = 0x26,
    EVENT_PUBLISHED_SUBSCRIPTIONS = 0x27,
    RECORD_LISTENING = 0x28,
    EVENT_LISTENING = 0x29,
    STATE_REGISTRY = 0x30,
    CLUSTER = 0x31,
    LOCK = 0x32,
    MONITORING_SUBSCRIPTIONS = 0x33
}

export enum PARSER_ACTIONS {
    UNKNOWN_TOPIC = 0x50,
    UNKNOWN_ACTION = 0x51,
    INVALID_MESSAGE = 0x52,
    MESSAGE_PARSE_ERROR = 0x53,
    MAXIMUM_MESSAGE_SIZE_EXCEEDED = 0x54,
    ERROR = 0x55,
    INVALID_META_PARAMS = 0x56,
}

export enum CONNECTION_ACTIONS {
    ERROR = 0x00,
    PING = 0x01,
    PONG = 0x02,
    ACCEPT = 0x03,
    CHALLENGE = 0x04,
    REJECT = 0x06,
    REDIRECT = 0x07,
    CLOSING = 0x08,
    CLOSED = 0x09,

    AUTHENTICATION_TIMEOUT = 0x50,
    INVALID_MESSAGE = 0x52,
}

export enum AUTH_ACTIONS {
    ERROR = 0x00,
    REQUEST = 0x01,
    AUTH_SUCCESSFUL = 0x02,
    AUTH_UNSUCCESSFUL = 0x03,

    TOO_MANY_AUTH_ATTEMPTS = 0x50,
    INVALID_MESSAGE = 0x52,

    INVALID_MESSAGE_DATA = 0x62,
}

export enum EVENT_ACTIONS {
    ERROR = 0x00,
    EMIT = 0x01,

    SUBSCRIBE = 0x02,
    SUBSCRIBE_ACK = 0x82,

    UNSUBSCRIBE = 0x03,
    UNSUBSCRIBE_ACK = 0x83,

    LISTEN = 0x30,
    LISTEN_ACK = 0xB0,

    UNLISTEN = 0x32,
    UNLISTEN_ACK = 0xB2,

    LISTEN_ACCEPT = 0x34,
    LISTEN_REJECT = 0x35,

    SUBSCRIPTION_HAS_PROVIDER = 0x36,
    SUBSCRIPTION_HAS_NO_PROVIDER = 0x37,
    SUBSCRIPTION_FOR_PATTERN_FOUND = 0x38,
    SUBSCRIPTION_FOR_PATTERN_REMOVED = 0x39,

    INVALID_LISTEN_REGEX = 0x50,
    LISTEN_RESPONSE_TIMEOUT = 0x51,
    LISTEN_UNSUCCESSFUL = 0x52,

    MESSAGE_PERMISSION_ERROR = 0x60,
    MESSAGE_DENIED = 0x61,
    INVALID_MESSAGE_DATA = 0x62,
    MULTIPLE_SUBSCRIPTIONS = 0x63,
    NOT_SUBSCRIBED = 0x64,
}

export enum RECORD_ACTIONS {
    ERROR = 0x00,

    NOTIFY = 0x01,

    READ = 0x02,
    READ_RESPONSE = 0x03,

    HEAD = 0x04,
    HEAD_RESPONSE = 0x05,

    HEAD_BULK = 0x06,
    HEAD_RESPONSE_BULK = 0x07,

    DELETE = 0x08,
    DELETE_SUCCESS = 0x09,

    DELETE_BULK = 0x0A,
    DELETE_BULK_SUCCESS = 0x0B,

    DELETED = 0x0C,

    WRITE_ACKNOWLEDGEMENT = 0x0D,

    CREATE = 0x10,
    CREATEANDUPDATE = 0x11,
    CREATEANDUPDATE_WITH_WRITE_ACK = 0x12,

    CREATEANDPATCH = 0x13,
    CREATEANDPATCH_WITH_WRITE_ACK = 0x14,

    UPDATE = 0x15,
    UPDATE_WITH_WRITE_ACK = 0x16,

    PATCH = 0x17,
    PATCH_WITH_WRITE_ACK = 0x18,

    ERASE = 0x19,
    ERASE_WITH_WRITE_ACK = 0x1A,

    SUBSCRIBEANDHEAD = 0x20,
    SUBSCRIBEANDHEAD_ACK = 0xA0,

    SUBSCRIBEANDREAD = 0x22,
    SUBSCRIBEANDREAD_ACK = 0xA2,

    SUBSCRIBECREATEANDREAD = 0x24,
    SUBSCRIBECREATEANDREAD_ACK = 0xA4,

    // SUBSCRIBECREATEANDUPDATE = 0x26,
    // SUBSCRIBECREATEANDUPDATE_ACK = 0xA6,

    SUBSCRIBE = 0x28,
    SUBSCRIBE_ACK = 0xA8,

    UNSUBSCRIBE = 0x29,
    UNSUBSCRIBE_ACK = 0xA9,

    LISTEN = 0x30,
    LISTEN_ACK = 0xB0,

    UNLISTEN = 0x32,
    UNLISTEN_ACK = 0xB2,

    LISTEN_ACCEPT = 0x34,
    LISTEN_REJECT = 0x35,

    SUBSCRIPTION_HAS_PROVIDER = 0x36,
    SUBSCRIPTION_HAS_NO_PROVIDER = 0x37,
    SUBSCRIPTION_FOR_PATTERN_FOUND = 0x38,
    SUBSCRIPTION_FOR_PATTERN_REMOVED = 0x39,

    CACHE_RETRIEVAL_TIMEOUT = 0x50,
    STORAGE_RETRIEVAL_TIMEOUT = 0x51,
    VERSION_EXISTS = 0x52,
    RECORD_LOAD_ERROR = 0x53,
    RECORD_CREATE_ERROR = 0x54,
    RECORD_UPDATE_ERROR = 0x55,
    RECORD_DELETE_ERROR = 0x56,
    RECORD_NOT_FOUND = 0x58,
    INVALID_VERSION = 0x59,
    INVALID_PATCH_ON_HOTPATH = 0x5A,
    INVALID_LISTEN_REGEX = 0x5B,
    LISTEN_RESPONSE_TIMEOUT = 0x5C,
    LISTEN_UNSUCCESSFUL = 0x5D,
    RECORD_NOTIFY_ERROR = 0x5E,

    MESSAGE_PERMISSION_ERROR = 0x60,
    MESSAGE_DENIED = 0x61,
    INVALID_MESSAGE_DATA = 0x62,
    MULTIPLE_SUBSCRIPTIONS = 0x63,
    NOT_SUBSCRIBED = 0x64,
}

export enum RPC_ACTIONS {
    ERROR = 0x00,
    REQUEST = 0x01,
    ACCEPT = 0x02,
    RESPONSE = 0x03,
    REJECT = 0x04,
    REQUEST_ERROR = 0x05,
    PROVIDE = 0x06,
    PROVIDE_ACK = 0x86,
    UNPROVIDE = 0x07,
    UNPROVIDE_ACK = 0x87,

    NO_RPC_PROVIDER = 0x50,
    ACCEPT_TIMEOUT = 0x52,
    MULTIPLE_ACCEPT = 0x53,
    INVALID_RPC_CORRELATION_ID = 0x54,
    RESPONSE_TIMEOUT = 0x55,
    MULTIPLE_RESPONSE = 0x56,

    MESSAGE_PERMISSION_ERROR = 0x60,
    MESSAGE_DENIED = 0x61,
    INVALID_MESSAGE_DATA = 0x62,
    MULTIPLE_PROVIDERS = 0x63,
    NOT_PROVIDED = 0x64,
}

export enum PRESENCE_ACTIONS {
    ERROR = 0x00,

    QUERY_ALL = 0x01,
    QUERY_ALL_RESPONSE = 0x02,
    QUERY = 0x03,
    QUERY_RESPONSE = 0x04,
    PRESENCE_JOIN = 0x05,
    PRESENCE_JOIN_ALL = 0x06,
    PRESENCE_LEAVE = 0x07,
    PRESENCE_LEAVE_ALL = 0x08,

    SUBSCRIBE = 0x09,
    SUBSCRIBE_ACK = 0x89,
    UNSUBSCRIBE = 0x0A,
    UNSUBSCRIBE_ACK = 0x8A,

    SUBSCRIBE_ALL = 0x0B,
    SUBSCRIBE_ALL_ACK = 0x8B,
    UNSUBSCRIBE_ALL = 0x0C,
    UNSUBSCRIBE_ALL_ACK = 0x8C,

    INVALID_PRESENCE_USERS = 0x50,

    MESSAGE_PERMISSION_ERROR = 0x60,
    MESSAGE_DENIED = 0x61,
    MULTIPLE_SUBSCRIPTIONS = 0x63,
    NOT_SUBSCRIBED = 0x64,
}

export enum LOCK_ACTIONS {
    ERROR = 0x00,
    REQUEST = 0x01,
    RESPONSE = 0x02,
    RELEASE = 0x03
}

export enum STATE_ACTIONS {
    ERROR = 0x00,
    ADD = 0x01,
    REMOVE = 0x02,
    REQUEST_FULL_STATE = 0x03,
    FULL_STATE = 0x04,
    CHECKSUM = 0x05
}

export enum CLUSTER_ACTIONS {
    REMOVE,
    STATUS
}

export enum MONITORING_ACTIONS {

}

export const ACTIONS: any = {
    [TOPIC.PARSER]: PARSER_ACTIONS,
    [TOPIC.CONNECTION]: CONNECTION_ACTIONS,
    [TOPIC.AUTH]: AUTH_ACTIONS,
    [TOPIC.EVENT]: EVENT_ACTIONS,
    [TOPIC.RECORD]: RECORD_ACTIONS,
    [TOPIC.RPC]: RPC_ACTIONS,
    [TOPIC.PRESENCE]: PRESENCE_ACTIONS,
    [TOPIC.LOCK]: LOCK_ACTIONS,
    [TOPIC.STATE_REGISTRY]: STATE_ACTIONS,
    [TOPIC.CLUSTER]: CLUSTER_ACTIONS,
    [TOPIC.MONITORING]: MONITORING_ACTIONS
}

export const enum EVENT {
    INFO = 'INFO',
    ERROR = 'ERROR',
    DEPRECATED = 'DEPRECATED',

    FATAL_EXCEPTION = 'FATAL_EXCEPTION',
    NOT_VALID_UUID = 'NOT_VALID_UUID',
    DEEPSTREAM_STATE_CHANGED = 'DEEPSTREAM_STATE_CHANGED',
    INCOMING_CONNECTION = 'INCOMING_CONNECTION',
    CLOSED_SOCKET_INTERACTION = 'CLOSED_SOCKET_INTERACTION',
    CLIENT_DISCONNECTED = 'CLIENT_DISCONNECTED',
    CONNECTION_ERROR = 'CONNECTION_ERROR',
    AUTH_ERROR = 'AUTH_ERROR',
    AUTH_RETRY_ATTEMPTS_EXCEEDED = 'AUTH_RETRY_ATTEMPTS_EXCEEDED',

    PLUGIN_ERROR = 'PLUGIN_ERROR',
    PLUGIN_INITIALIZATION_ERROR = 'PLUGIN_INITIALIZATION_ERROR',
    PLUGIN_INITIALIZATION_TIMEOUT = 'PLUGIN_INITIALIZATION_TIMEOUT',

    TIMEOUT = 'TIMEOUT',

    LEADING_LISTEN = 'LEADING_LISTEN',
    LOCAL_LISTEN = 'LOCAL_LISTEN',

    INVALID_CONFIG_DATA = 'INVALID_CONFIG_DATA',
    INVALID_STATE_TRANSITION = 'INVALID_STATE_TRANSITION',

    INVALID_LEADER_REQUEST = 'INVALID_LEADER_REQUEST',

    CLUSTER_LEAVE = 'CLUSTER_LEAVE',
    CLUSTER_JOIN = 'CLUSTER_JOIN',
    CLUSTER_SIZE = 'CLUSTER_SIZE',

    UNKNOWN_ACTION = 'UNKNOWN_ACTION'
}
