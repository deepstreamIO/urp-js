export enum RECORD_ACTION {
    UNKNOWN = 0,

    ERROR = 1,

  NOTIFY = 2,

  READ = 3,
  READ_RESPONSE = 4,

  HEAD = 5,
  HEAD_RESPONSE = 6,

  HEAD_BULK = 7,
  HEAD_RESPONSE_BULK = 8,

  DELETE = 9,
  DELETE_SUCCESS = 10,

  DELETE_BULK = 11,
  DELETE_BULK_SUCCESS = 12,

  DELETED = 13,

  WRITE_ACKNOWLEDGEMENT = 14,

  CREATE = 15,
  CREATEANDUPDATE = 16,

  CREATEANDPATCH = 17,

  UPDATE = 18,

  PATCH = 19,

  ERASE = 20,

  SUBSCRIBEANDHEAD = 21,

  SUBSCRIBEANDREAD = 22,

  SUBSCRIBECREATEANDREAD = 23,

  SUBSCRIBECREATEANDUPDATE = 24,

  SUBSCRIBE = 25,

  UNSUBSCRIBE = 26,

  LISTEN = 27,

  UNLISTEN = 28,

  LISTEN_ACCEPT = 29,
  LISTEN_REJECT = 30,

  SUBSCRIPTION_HAS_PROVIDER = 31,
  SUBSCRIPTION_HAS_NO_PROVIDER = 32,
  SUBSCRIPTION_FOR_PATTERN_FOUND = 33,
  SUBSCRIPTION_FOR_PATTERN_REMOVED = 34,

  CACHE_RETRIEVAL_TIMEOUT = 100,
  STORAGE_RETRIEVAL_TIMEOUT  = 101,
  VERSION_EXISTS  = 102,
  RECORD_LOAD_ERROR  = 103,
  RECORD_CREATE_ERROR  = 104,
  RECORD_UPDATE_ERROR  = 105,
  RECORD_DELETE_ERROR  = 106,
  RECORD_NOT_FOUND  = 107,
  INVALID_VERSION  = 108,
  INVALID_PATCH_ON_HOTPATH  = 109,
  INVALID_LISTEN_REGEX  = 110,
  LISTEN_RESPONSE_TIMEOUT  = 111,
  LISTEN_UNSUCCESSFUL  = 112,
  RECORD_NOTIFY_ERROR  = 113,

  MESSAGE_PERMISSION_ERROR  = 114,
  MESSAGE_DENIED  = 115,
  INVALID_MESSAGE_DATA  = 116,
  MULTIPLE_SUBSCRIPTIONS  = 117,
  NOT_SUBSCRIBED  = 118,
}
