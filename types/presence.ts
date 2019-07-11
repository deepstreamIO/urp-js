export enum PRESENCE_ACTION {
    UNKNOWN = 0,
  ERROR = 1,

  QUERY_ALL = 2,
  QUERY_ALL_RESPONSE = 3,
  QUERY = 4,
  QUERY_RESPONSE = 5,
  PRESENCE_JOIN = 6,
  PRESENCE_JOIN_ALL = 7,
  PRESENCE_LEAVE = 8,
  PRESENCE_LEAVE_ALL = 9,

  SUBSCRIBE = 10,
  UNSUBSCRIBE = 11,
  SUBSCRIBE_ALL = 12,
  UNSUBSCRIBE_ALL = 13,

  INVALID_PRESENCE_USERS = 100,

  MESSAGE_PERMISSION_ERROR = 101,
  MESSAGE_DENIED = 102,
  MULTIPLE_SUBSCRIPTIONS = 103,
  NOT_SUBSCRIBED = 104,
}
