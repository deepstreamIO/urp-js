import {
    TOPIC,
    AuthMessage,
    ClusterMessage,
    RecordMessage,
    ConnectionMessage,
    EventMessage,
    LockMessage,
    MonitoringMessage,
    ParserMessage,
    PresenceMessage,
    RpcMessage,
    // @ts-ignore
} from '../generated/protobuf'

export const TopicMessage = {
    [TOPIC.RECORD]: RecordMessage,
    [TOPIC.CLUSTER]: ClusterMessage,
    [TOPIC.CONNECTION]: ConnectionMessage,
    [TOPIC.AUTH]: AuthMessage,
    [TOPIC.EVENT]: EventMessage,
    [TOPIC.LOCK]: LockMessage,
    [TOPIC.MONITORING]: MonitoringMessage,
    [TOPIC.PARSER]: ParserMessage,
    [TOPIC.PRESENCE]: PresenceMessage,
    [TOPIC.RPC]: RpcMessage
}
