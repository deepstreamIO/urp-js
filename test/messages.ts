/* tslint:disable:no-bitwise */

import {
  TOPIC,
  ALL_ACTIONS,
  AUTH_ACTIONS as AA,
  CONNECTION_ACTIONS as CA,
  EVENT_ACTIONS as EA,
  PARSER_ACTIONS as XA,
  PRESENCE_ACTIONS as UA,
  RECORD_ACTIONS as RA,
  RPC_ACTIONS as PA,
  PAYLOAD_ENCODING,
  Message,
} from '../src/message-constants'

interface MessageSpec {
  message: Message
  urp: {
    value: Buffer
    args: Array<String>
    payload: string | null
    description?: string
    source?: 'server' | 'client' | 'server/client'
  }
}

function m (data: MessageSpec): MessageSpec {
  data.message = Object.assign({
    isAck: false,
    isError: false,
  }, data.message)
  if (data.message.parsedData) {
    data.message.data = Buffer.from(JSON.stringify(data.message.parsedData), 'utf8')
  }
  return data
}

function binMsg (
  topicByte: number,
  actionByte: number,
  meta: string | object,
  payload: string | object | Buffer,
  fin: boolean = true,
): Buffer {
  if (typeof meta === 'object') {
    meta = JSON.stringify(meta)
  }
  let payloadBuff: Buffer
  if (payload instanceof Buffer) {
    payloadBuff = payload
  } else {
    if (typeof payload === 'object') {
      payload = JSON.stringify(payload)
    }
    payloadBuff = Buffer.from(payload, 'utf8')
  }
  const metaLen = Buffer.byteLength(meta)
  const payloadLen = payloadBuff.length
  return Buffer.concat([
    Buffer.from([
      (fin ? 0x80 : 0x00) | topicByte,
      actionByte,
      metaLen >> 16,
      metaLen >> 8,
      metaLen,
      payloadLen >> 16,
      payloadLen >> 8,
      payloadLen,
    ]),
    Buffer.from(meta, 'utf8'),
    payloadBuff,
  ])
}

function extendWithSubscriptionMessages (topic, actions, messages) {
  Object.assign(messages, {
    SUBSCRIBE: m({
      message: {
        topic,
        action: actions.SUBSCRIBE,
        name: 'subscription',
      },
      urp: {
        value: binMsg(
          topic,
          actions.SUBSCRIBE,
          { n: 'subscription' },
          ''
        ),
        args: ['name'],
        payload: null,
        description: 'Sent to subscribe to a given name',
        source: 'client'
      }
    }),
    SUBSCRIBE_ACK: m({
      message: {
        isAck: true,
        topic,
        action: actions.SUBSCRIBE,
        name: 'subscription',
      },
      urp: {
        value: binMsg(
          topic,
          actions.SUBSCRIBE_ACK,
          { n: 'subscription' },
          ''
        ),
        args: ['name'],
        payload: null,
        description: 'Sent when a \'SUBSCRIBE\' message is permissioned and the subscription registered,',
        source: 'server'
      }
    }),
    UNSUBSCRIBE: m({
      message: {
        topic,
        action: actions.UNSUBSCRIBE,
        name: 'subscription',
      },
      urp: {
        value: binMsg(
          topic,
          actions.UNSUBSCRIBE,
          { n: 'subscription' },
          ''
        ),
        args: ['name'],
        payload: null,
        description: 'Sent to unsubscribe to a given name',
        source: 'client'
      }
    }),
    UNSUBSCRIBE_ACK: m({
      message: {
        isAck: true,
        topic,
        action: actions.UNSUBSCRIBE,
        name: 'subscription',
      },
      urp: {
        value: binMsg(
          topic,
          actions.UNSUBSCRIBE_ACK,
          { n: 'subscription' },
          ''
        ),
        args: ['name'],
        payload: null,
        description: 'Sent when an \'UNSUBSCRIBE\' message is permissioned and the subscription deregistered,',
        source: 'server'
      }
    }),
    MULTIPLE_SUBSCRIPTIONS: m({
      message: {
        isError: true,
        topic,
        action: actions.MULTIPLE_SUBSCRIPTIONS,
        name: 'username',
      },
      urp: {
        value: binMsg(
          topic,
          actions.MULTIPLE_SUBSCRIPTIONS,
          { n: 'username' },
          ''
        ),
        args: ['name'],
        payload: null,
        description: 'Sent in response to a \'SUBSCRIBE\' message if the subscription already exists',
        source: 'server'
      }
    }),
    NOT_SUBSCRIBED: m({
      message: {
        isError: true,
        topic,
        action: actions.NOT_SUBSCRIBED,
        name: 'username',
      },
      urp: {
        value: binMsg(
          topic,
          actions.NOT_SUBSCRIBED,
          { n: 'username' },
          ''
        ),
        args: ['name'],
        payload: null,
        description: 'Sent in response to an \'UNSUBSCRIBE\' message if the subscription does not already exist',
        source: 'server'
      }
    }),
  })
}

function extendWithListenMessages (topic, actions, messages) {
  Object.assign(messages, {
    LISTEN: m({
      message: {
        topic,
        action: actions.LISTEN,
        name: '.*',
      },
      urp: {
        value: binMsg(
          topic,
          actions.LISTEN,
          { n: '.*' },
          ''
        ),
        args: ['name'],
        payload: null,
      }
    }),
    LISTEN_ACK: m({
      message: {
        isAck: true,
        topic,
        action: actions.LISTEN,
        name: '.*',
      },
      urp: {
        value: binMsg(
          topic,
          actions.LISTEN_ACK,
          { n: '.*' },
          ''
        ),
        args: ['name'],
        payload: null,
      }
    }),
    UNLISTEN: m({
      message: {
        topic,
        action: actions.UNLISTEN,
        name: '.*',
      },
      urp: {
        value: binMsg(
          topic,
          actions.UNLISTEN,
          { n: '.*' },
          ''
        ),
        args: ['name'],
        payload: null,
      }
    }),
    UNLISTEN_ACK: m({
      message: {
        isAck: true,
        topic,
        action: actions.UNLISTEN,
        name: '.*',
      },
      urp: {
        value: binMsg(
          topic,
          actions.UNLISTEN_ACK,
          { n: '.*' },
          ''
        ),
        args: ['name'],
        payload: null,
      }
    }),
    SUBSCRIPTION_FOR_PATTERN_FOUND: m({
      message: {
        topic,
        action: actions.SUBSCRIPTION_FOR_PATTERN_FOUND,
        name: '.*',
        subscription: 'someSubscription',
      },
      urp: {
        value: binMsg(
          topic,
          actions.SUBSCRIPTION_FOR_PATTERN_FOUND,
          { n: '.*', s: 'someSubscription' },
          ''
        ),
        args: ['name', 'subscription'],
        payload: null,
      }
    }),
    SUBSCRIPTION_FOR_PATTERN_REMOVED: m({
      message: {
        topic,
        action: actions.SUBSCRIPTION_FOR_PATTERN_REMOVED,
        name: '.*',
        subscription: 'someSubscription',
      },
      urp: {
        value: binMsg(
          topic,
          actions.SUBSCRIPTION_FOR_PATTERN_REMOVED,
          { n: '.*', s: 'someSubscription' },
          ''
        ),
        args: ['name', 'subscription'],
        payload: null,
      }
    }),
    LISTEN_ACCEPT: m({
      message: {
        topic,
        action: actions.LISTEN_ACCEPT,
        name: '.*',
        subscription: 'someSubscription',
      },
      urp: {
        value: binMsg(
          topic,
          actions.LISTEN_ACCEPT,
          { n: '.*', s: 'someSubscription' },
          ''
        ),
        args: ['name', 'subscription'],
        payload: null,
      }
    }),
    LISTEN_REJECT: m({
      message: {
        topic,
        action: actions.LISTEN_REJECT,
        name: '.*',
        subscription: 'someSubscription',
      },
      urp: {
        value: binMsg(
          topic,
          actions.LISTEN_REJECT,
          { n: '.*', s: 'someSubscription' },
          ''
        ),
        args: ['name', 'subscription'],
        payload: null,
      }
    }),
  })
}

export const PARSER_MESSAGES: { [key: string]: MessageSpec | null } = {
  UNKNOWN_TOPIC: m({
    message: {
      isError: true,
      topic: TOPIC.PARSER,
      action: XA.UNKNOWN_TOPIC,
      originalTopic: 0x25
    },
    urp: {
      value: binMsg(TOPIC.PARSER, XA.UNKNOWN_TOPIC, { t: 0x25 }, ''),
      args: [],
      payload: null,
    }
  }),
  UNKNOWN_ACTION: m({
    message: {
      isError: true,
      topic: TOPIC.PARSER,
      action: XA.UNKNOWN_ACTION,
      originalTopic: TOPIC.EVENT,
      originalAction: 0x52
    },
    urp: {
      value: binMsg(TOPIC.PARSER, XA.UNKNOWN_ACTION, { t: TOPIC.EVENT, a: 0x52 }, ''),
      args: [],
      payload: null,
    }
  }),
  INVALID_MESSAGE: m({
    message: {
      topic: TOPIC.PARSER,
      action: XA.INVALID_MESSAGE,
      isError: true
    },
    urp: {
      value: binMsg(TOPIC.PARSER, XA.INVALID_MESSAGE, '', ''),
      args: [],
      payload: null,
    }
  }),
  MESSAGE_PARSE_ERROR: m({
    message: {
      topic: TOPIC.PARSER,
      action: XA.MESSAGE_PARSE_ERROR,
      isError: true,
      data: Buffer.from([0xE, 0xE, 0xE, 0xE, 0xE, 0xE, 0xE, 0xE]),
      payloadEncoding: PAYLOAD_ENCODING.BINARY,
    },
    urp: {
      value: binMsg(
        TOPIC.PARSER,
        XA.MESSAGE_PARSE_ERROR,
        '',
        Buffer.from([0xE, 0xE, 0xE, 0xE, 0xE, 0xE, 0xE, 0xE])
      ),
      args: [],
      payload: 'rawMessage',
    }
  }),
  INVALID_META_PARAMS: m({
    message: {
      topic: TOPIC.PARSER,
      action: XA.INVALID_META_PARAMS,
      isError: true,
      originalTopic: TOPIC.RECORD,
      originalAction: RA.READ,
      data: new Buffer('{"r":"too', 'utf8'),
      payloadEncoding: PAYLOAD_ENCODING.BINARY,
    },
    urp: {
      value: binMsg(
        TOPIC.PARSER,
        XA.INVALID_META_PARAMS,
        { t: TOPIC.RECORD, a: RA.READ },
        '{"r":"too'
      ),
      args: ['parsedTopic', 'parsedAction'],
      payload: 'rawMeta',
    }
  }),
  MAXIMUM_MESSAGE_SIZE_EXCEEDED: m({
    message: {
      topic: TOPIC.PARSER,
      action: XA.MAXIMUM_MESSAGE_SIZE_EXCEEDED,
      isError: true
    },
    urp: {
      value: binMsg(TOPIC.PARSER, XA.MAXIMUM_MESSAGE_SIZE_EXCEEDED, '', ''),
      args: [],
      payload: null,
    }
  }),
  ERROR: null
}

export const CONNECTION_MESSAGES: {[key: string]: MessageSpec | null} = {
  PING: m({
    message: {
      topic: TOPIC.CONNECTION,
      action: CA.PING
    },
    urp: {
      value: binMsg(TOPIC.CONNECTION, CA.PING, '', '') ,
      args: [],
      payload: null,
      description: 'Sent periodically to ensure a live connection',
      source: 'server'
    },
  }),
  PONG: m({
    message: {
      topic: TOPIC.CONNECTION,
      action: CA.PONG
    },
    urp: {
      value: binMsg(TOPIC.CONNECTION, CA.PONG, '', ''),
      args: [],
      payload: null,
      description: 'Sent immediately in response to a \'Ping\' message',
      source: 'client'
    }
  }),
  CHALLENGE: m({
    message: {
      topic: TOPIC.CONNECTION,
      action: CA.CHALLENGE,
    },
    urp: {
      value: binMsg(TOPIC.CONNECTION, CA.CHALLENGE, '', ''),
      args: [],
      payload: null,
      description: 'Sent as soon as a connection is established',
      source: 'server'
    }
  }),
  CHALLENGE_RESPONSE: m({
    message: {
      topic: TOPIC.CONNECTION,
      action: CA.CHALLENGE_RESPONSE,
      url: 'ws://url.io',
    },
    urp: {
      value: binMsg(TOPIC.CONNECTION, CA.CHALLENGE_RESPONSE, { u: 'ws://url.io' }, ''),
      args: ['url'],
      payload: null,
      description: 'Sent when a \'Connection Challenge\' is received',
      source: 'client'
    }
  }),
  ACCEPT: m({
    message: {
      topic: TOPIC.CONNECTION,
      action: CA.ACCEPT,
    },
    urp: {
      value: binMsg(TOPIC.CONNECTION, CA.ACCEPT, '', ''),
      args: [],
      payload: null,
      description: 'Sent in response to a \'Challenge Response\' if the requested URL is valid',
      source: 'server'
    }
  }),
  REJECT: m({
    message: {
      topic: TOPIC.CONNECTION,
      action: CA.REJECT,
    },
    urp: {
      value: binMsg(TOPIC.CONNECTION, CA.REJECT, '', ''),
      args: [],
      payload: null,
      description: 'Sent in response to a \'Challenge Response\' if the requested URL is invalid',
      source: 'server'
    }
  }),
  REDIRECT: m({
    message: {
      topic: TOPIC.CONNECTION,
      action: CA.REDIRECT,
      url: 'ws://url.io',
    },
    urp: {
      value: binMsg(TOPIC.CONNECTION, CA.REDIRECT, { u: 'ws://url.io' }, ''),
      args: ['url'],
      payload: null,
      description: 'Sent to redirect a client to a different url',
      source: 'server'
    }
  }),
  CLOSING: m({
    message: {
      topic: TOPIC.CONNECTION,
      action: CA.CLOSING,
    },
    urp: {
      value: binMsg(TOPIC.CONNECTION, CA.CLOSING, '', ''),
      args: [],
      payload: null,
      description: 'Sent to server when closing the connection',
      source: 'client'
    }
  }),
  CLOSED: m({
    message: {
      topic: TOPIC.CONNECTION,
      action: CA.CLOSED,
    },
    urp: {
      value: binMsg(TOPIC.CONNECTION, CA.CLOSED, '', ''),
      args: [],
      payload: null,
      description: 'Sent to client when acknowledging graceful close',
      source: 'server'
    }
  }),
  ERROR: null,
  AUTHENTICATION_TIMEOUT: m({
    message: {
      isError: true,
      topic: TOPIC.CONNECTION,
      action: CA.AUTHENTICATION_TIMEOUT,
    },
    urp: {
      value: binMsg(TOPIC.CONNECTION, CA.AUTHENTICATION_TIMEOUT, '', ''),
      args: [],
      payload: null,
      description: 'Sent if a connection has not authenticated successfully within the configured AUTHENTICATION_TIMEOUT',
      source: 'server'
    }
  }),
  INVALID_MESSAGE: m({
    message: {
      isError: true,
      topic: TOPIC.CONNECTION,
      action: AA.INVALID_MESSAGE,
      originalTopic: TOPIC.EVENT,
      originalAction: EA.LISTEN
    },
    urp: {
      value: binMsg(TOPIC.CONNECTION, AA.INVALID_MESSAGE, { t: TOPIC.EVENT, a: EA.LISTEN }, ''),
      args: [],
      payload: null,
      description: 'Sent if a connecting socket receives a message with topic other than CONNECTION.',
      source: 'server'
    }
  }),
}

export const AUTH_MESSAGES: {[key: string]: MessageSpec | null} = {
  REQUEST: m({
    message: {
      topic: TOPIC.AUTH,
      action: AA.REQUEST,
      parsedData: { username: 'ricardo' },
    },
    urp: {
      value: binMsg(TOPIC.AUTH, AA.REQUEST, '', { username: 'ricardo' }),
      args: [],
      payload: 'authData',
      description: 'Sent to authenticate a client with optional credentials',
      source: 'client'
    }
  }),
  AUTH_SUCCESSFUL: m({
    message: {
      topic: TOPIC.AUTH,
      action: AA.AUTH_SUCCESSFUL,
      parsedData: { id: 'foobar' },
    },
    urp: {
      value: binMsg(TOPIC.AUTH, AA.AUTH_SUCCESSFUL, '', { id: 'foobar' }),
      args: [],
      payload: 'clientData',
      description: 'Sent if authentication was successful',
      source: 'server'
    }
  }),
  AUTH_UNSUCCESSFUL: m({
    message: {
      topic: TOPIC.AUTH,
      action: AA.AUTH_UNSUCCESSFUL,
      parsedData: {
        authResponse: 404
      },
    },
    urp: {
      value: binMsg(TOPIC.AUTH, AA.AUTH_UNSUCCESSFUL, '', { authResponse: 404 }),
      args: [],
      payload: 'clientData',
      description: 'Sent if authentication was unsuccessful',
      source: 'server'
    }
  }),
  TOO_MANY_AUTH_ATTEMPTS: m({
    message: {
      isError: true,
      topic: TOPIC.AUTH,
      action: AA.TOO_MANY_AUTH_ATTEMPTS,
    },
    urp: {
      value: binMsg(TOPIC.AUTH, AA.TOO_MANY_AUTH_ATTEMPTS, '', ''),
      args: [],
      payload: null,
      description: 'Sent if the number of unsuccessful authentication attempts exceeds a configured maximum. Followed by a connection close.',
      source: 'server'
    }
  }),
  INVALID_MESSAGE: m({
    message: {
      isError: true,
      topic: TOPIC.AUTH,
      action: AA.INVALID_MESSAGE,
      originalTopic: TOPIC.EVENT,
      originalAction: EA.LISTEN
    },
    urp: {
      value: binMsg(TOPIC.AUTH, AA.INVALID_MESSAGE, { t: TOPIC.EVENT, a: EA.LISTEN }, ''),
      args: [],
      payload: null,
      description: 'Sent if an authenticating socket receives a message with topic other than AUTH.',
      source: 'server'
    }
  }),
  INVALID_MESSAGE_DATA: m({
    message: {
      isError: true,
      topic: TOPIC.AUTH,
      action: AA.INVALID_MESSAGE_DATA,
      originalAction: AA.REQUEST
    },
    urp: {
      value: binMsg(TOPIC.AUTH, AA.INVALID_MESSAGE_DATA, { a: AA.REQUEST }, ''),
      args: [],
      payload: null,
      description: 'Sent if the provided authentication data is invalid.',
      source: 'server'
    }
  }),
  ERROR: null,
}

export const RECORD_MESSAGES: {[key: string]: MessageSpec | null} = {
  HEAD: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.HEAD,
      name: 'user/someId',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.HEAD, { n: 'user/someId' }, ''),
      args: ['name'],
      payload: null,
      description: 'Sent to request the current version of a given record',
      source: 'client'
    }
  }),
  HEAD_RESPONSE: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.HEAD_RESPONSE,
      name: 'user/someId',
      version: 12,
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.HEAD_RESPONSE, { n: 'user/someId', v: 12 }, ''),
      args: ['name', 'version'],
      payload: null,
      description: 'Sent in response to a \'HEAD\' message with the current version of a record',
      source: 'server'
    }
  }),
  READ: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.READ,
      name: 'user/someId',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.READ, { n: 'user/someId' }, ''),
      args: ['name'],
      payload: null,
      description: 'Sent to request the content of a given record',
      source: 'client'
    }
  }),
  READ_RESPONSE: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.READ_RESPONSE,
      name: 'user/someId',
      parsedData: {firstname: 'Wolfram'},
      version: 1,
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.READ_RESPONSE, { n: 'user/someId', v: 1 }, { firstname: 'Wolfram' }),
      args: ['name', 'version'],
      payload: 'recordData',
      description: 'Sent in response to a \'READ\' message with the current version and content of a record',
      source: 'server'
    }
  }),
  UPDATE: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.UPDATE,
      name: 'user/someId',
      version: 1,
      parsedData: { firstname: 'Wolfram' },
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.UPDATE, { n: 'user/someId', v: 1 }, { firstname: 'Wolfram' }),
      args: ['name', 'version'],
      payload: 'recordData',
    }
  }),
  UPDATE_WITH_WRITE_ACK: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.UPDATE_WITH_WRITE_ACK,
      name: 'user/someId',
      version: 1,
      parsedData: { firstname: 'Wolfram' },
      isWriteAck: true,
      correlationId: '8237',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.UPDATE_WITH_WRITE_ACK, { n: 'user/someId', c: '8237', v: 1 }, { firstname: 'Wolfram' }),
      args: ['name', 'version'],
      payload: 'recordData',
    }
  }),
  PATCH: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.PATCH,
      name: 'user/someId',
      path: 'path',
      version: 1,
      parsedData: 'data',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.PATCH, { n: 'user/someId', v: 1, p: 'path' }, '"data"'),
      args: ['name', 'version', 'path'],
      payload: 'patchData',
    }
  }),
  PATCH_WITH_WRITE_ACK: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.PATCH_WITH_WRITE_ACK,
      name: 'user/someId',
      path: 'path',
      version: 1,
      parsedData: 'data',
      isWriteAck: true,
      correlationId: '8237',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.PATCH_WITH_WRITE_ACK, { n: 'user/someId', c: '8237', v: 1, p: 'path' }, '"data"'),
      args: ['name', 'version', 'path'],
      payload: 'patchData',
    }
  }),
  ERASE: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.ERASE,
      name: 'user/someId',
      path: 'path',
      version: 1,
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.ERASE, { n: 'user/someId', v: 1, p: 'path' }, ''),
      args: ['name', 'version', 'path'],
      payload: null,
    }
  }),
  ERASE_WITH_WRITE_ACK: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.ERASE_WITH_WRITE_ACK,
      name: 'user/someId',
      path: 'path',
      version: 1,
      isWriteAck: true,
      correlationId: '8237',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.ERASE_WITH_WRITE_ACK, { n: 'user/someId', c: '8237', v: 1, p: 'path' }, ''),
      args: ['name', 'version', 'path'],
      payload: null,
    }
  }),
  CREATEANDUPDATE: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.CREATEANDUPDATE,
      name: 'user/someId',
      version: 1,
      parsedData: { name: 'bob' },
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.CREATEANDUPDATE, { n: 'user/someId', v: 1 }, { name: 'bob' }),
      args: ['name', 'version'],
      payload: 'recordData',
    }
  }),
  CREATEANDUPDATE_WITH_WRITE_ACK: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.CREATEANDUPDATE_WITH_WRITE_ACK,
      name: 'user/someId',
      version: 1,
      parsedData: { name: 'bob' },
      isWriteAck: true,
      correlationId: '8237',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.CREATEANDUPDATE_WITH_WRITE_ACK, { n: 'user/someId', c: '8237', v: 1 }, { name: 'bob' }),
      args: ['name', 'version'],
      payload: 'recordData',
    }
  }),
  CREATEANDPATCH: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.CREATEANDPATCH,
      name: 'user/someId',
      version: 1,
      path: 'path',
      parsedData: 'data',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.CREATEANDPATCH, { n: 'user/someId', v: 1, p: 'path' }, '"data"'),
      args: ['name', 'version', 'path'],
      payload: 'patchData',
    }
  }),
  CREATEANDPATCH_WITH_WRITE_ACK: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.CREATEANDPATCH_WITH_WRITE_ACK,
      name: 'user/someId',
      version: 1,
      path: 'path',
      parsedData: 'data',
      isWriteAck: true,
      correlationId: '8237',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.CREATEANDPATCH_WITH_WRITE_ACK, { n: 'user/someId', c: '8237', v: 1, p: 'path' }, '"data"'),
      args: ['name', 'version', 'path'],
      payload: 'patchData',
    }
  }),
  DELETE : m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.DELETE,
      name: 'user/someId',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.DELETE, { n: 'user/someId' }, ''),
      args: ['name'],
      payload: null,
    }
  }),
  DELETE_SUCCESS : m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.DELETE_SUCCESS,
      name: 'user/someId',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.DELETE_SUCCESS, { n: 'user/someId' }, ''),
      args: ['name'],
      payload: null,
    }
  }),
  DELETED : m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.DELETED,
      name: 'user/someId',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.DELETED, { n: 'user/someId' }, ''),
      args: ['name'],
      payload: null,
    }
  }),
  SUBSCRIBECREATEANDREAD: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.SUBSCRIBECREATEANDREAD,
      name: 'user/someId',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.SUBSCRIBECREATEANDREAD, { n: 'user/someId' }, ''),
      args: ['name'],
      payload: null,
    }
  }),
  SUBSCRIPTION_HAS_PROVIDER: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.SUBSCRIPTION_HAS_PROVIDER,
      name: 'someSubscription',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.SUBSCRIPTION_HAS_PROVIDER, { n: 'someSubscription' }, ''),
      args: ['name'],
      payload: null,
    }
  }),
  SUBSCRIPTION_HAS_NO_PROVIDER: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.SUBSCRIPTION_HAS_NO_PROVIDER,
      name: 'someSubscription',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.SUBSCRIPTION_HAS_NO_PROVIDER, { n: 'someSubscription' }, ''),
      args: ['name'],
      payload: null,
    }
  }),
  WRITE_ACKNOWLEDGEMENT: m({
    message: {
      topic: TOPIC.RECORD,
      action: RA.WRITE_ACKNOWLEDGEMENT,
      name: 'someSubscription',
      parsedData: [ [-1], null ],
      correlationId: '1234',
      isWriteAck: true
    },
    // FIXME: versions and errors should be in meta, not payload
    urp: {
      value: binMsg(TOPIC.RECORD, RA.WRITE_ACKNOWLEDGEMENT, { n: 'someSubscription', c: '1234' }, [[-1], null]),
      args: ['name'],
      payload: '[errorVersionsArray, errorData]',
    }
  }),
  VERSION_EXISTS: m({
    message: {
      isError: true,
      topic: TOPIC.RECORD,
      action: RA.VERSION_EXISTS,
      name: 'recordName',
      parsedData: {
        x: 'yz'
      },
      version: 1,
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.VERSION_EXISTS, { n: 'recordName', v: 1 }, { x: 'yz' }),
      args: ['name', 'version'],
      payload: 'recordData',
    }
  }),
  CACHE_RETRIEVAL_TIMEOUT: m({
    message: {
      isError: true,
      topic: TOPIC.RECORD,
      action: RA.CACHE_RETRIEVAL_TIMEOUT,
      name: 'recordName',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.CACHE_RETRIEVAL_TIMEOUT, { n: 'recordName' }, ''),
      args: ['name'],
      payload: null,
    }
  }),
  STORAGE_RETRIEVAL_TIMEOUT: m({
    message: {
      isError: true,
      topic: TOPIC.RECORD,
      action: RA.STORAGE_RETRIEVAL_TIMEOUT,
      name: 'recordName',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.STORAGE_RETRIEVAL_TIMEOUT, { n: 'recordName' }, ''),
      args: ['name'],
      payload: null,
    }
  }),
  RECORD_LOAD_ERROR: null,
  RECORD_CREATE_ERROR: m({
    message: {
      isError: true,
      topic: TOPIC.RECORD,
      action: RA.RECORD_CREATE_ERROR,
      name: 'recordName'
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.RECORD_CREATE_ERROR, { n: 'recordName' }, ''),
      args: ['name'],
      payload: null,
    }
  }),
  RECORD_UPDATE_ERROR: null,
  RECORD_DELETE_ERROR: m({
    message: {
      isError: true,
      topic: TOPIC.RECORD,
      action: RA.RECORD_DELETE_ERROR,
      name: 'recordName'
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.RECORD_DELETE_ERROR, { n: 'recordName' }, ''),
      args: ['name'],
      payload: null,
    }
  }),
  RECORD_NOT_FOUND: m({
    message: {
      isError: true,
      topic: TOPIC.RECORD,
      action: RA.RECORD_NOT_FOUND,
      originalAction: RA.HEAD,
      name: 'recordName'
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.RECORD_NOT_FOUND, { n: 'recordName', a: RA.HEAD }, ''),
      args: ['name', 'originalAction'],
      payload: null,
    }
  }),
  INVALID_VERSION: null,
  INVALID_PATCH_ON_HOTPATH: m({
    message: {
      isError: true,
      topic: TOPIC.RECORD,
      action: RA.INVALID_PATCH_ON_HOTPATH,
      name: 'recordName'
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.INVALID_PATCH_ON_HOTPATH, { n: 'recordName' }, ''),
      args: ['name'],
      payload: null,
    }
  }),
  CREATE: null,
  SUBSCRIBEANDHEAD: null,
  SUBSCRIBEANDREAD: null,
  SUBSCRIBECREATEANDUPDATE: null,
  MESSAGE_PERMISSION_ERROR: m({
    message: {
      isError: true,
      topic: TOPIC.RECORD,
      action: RA.MESSAGE_PERMISSION_ERROR,
      originalAction: RA.READ,
      name: 'username',
    },
    urp: {
      value: binMsg(
        TOPIC.RECORD,
        RA.MESSAGE_PERMISSION_ERROR,
        { n: 'username', a: RA.READ },
        ''
      ),
      args: ['name'],
      payload: null,
    }
  }),
  MESSAGE_DENIED: m({
    message: {
      isError: true,
      topic: TOPIC.RECORD,
      action: RA.MESSAGE_DENIED,
      originalAction: RA.READ,
      name: 'username',
    },
    urp: {
      value: binMsg(
        TOPIC.RECORD,
        RA.MESSAGE_DENIED,
        { n: 'username', a: RA.READ },
        ''
      ),
      args: ['name'],
      payload: null,
    }
  }),
  INVALID_MESSAGE_DATA: m({
    message: {
      isError: true,
      topic: TOPIC.RECORD,
      action: RA.INVALID_MESSAGE_DATA,
      originalAction: RA.CREATEANDUPDATE,
      name: 'recordName',
    },
    urp: {
      value: binMsg(TOPIC.RECORD, RA.INVALID_MESSAGE_DATA, { n: 'recordName', a: RA.CREATEANDUPDATE }, ''),
      args: ['originalAction'],
      payload: 'rawData'
    }
  }),
  ERROR: null
}
extendWithSubscriptionMessages(TOPIC.RECORD, RA, RECORD_MESSAGES)
extendWithListenMessages(TOPIC.RECORD, RA, RECORD_MESSAGES)

export const RPC_MESSAGES: { [key: string]: MessageSpec | null } = {
  REQUEST_ERROR: m({
    message: {
      topic: TOPIC.RPC,
      action: PA.REQUEST_ERROR,
      name: 'addValues',
      correlationId: '1234',
      reason: 'ERROR_MESSAGE',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.REQUEST_ERROR,
        { n: 'addValues', c: '1234', r: 'ERROR_MESSAGE' },
        ''
      ),
      args: ['name', 'correlationId', 'reason'],
      payload: null
    }
  }),
  REQUEST: m({
    message: {
      topic: TOPIC.RPC,
      action: PA.REQUEST,
      name: 'addValues',
      correlationId: '1234',
      parsedData: { val1: 1, val2: 2 },
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.REQUEST,
        { n: 'addValues', c: '1234' },
        { val1: 1, val2: 2 }
      ),
      args: ['name', 'correlationId'],
      payload: 'rpcData'
    }
  }),
  ACCEPT: m({
    message: {
      topic: TOPIC.RPC,
      action: PA.ACCEPT,
      name: 'addValues',
      correlationId: '1234',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.ACCEPT,
        { n: 'addValues', c: '1234' },
        ''
      ),
      args: ['name', 'correlationId'],
      payload: null
    }
  }),
  REJECT: m({
    message: {
      topic: TOPIC.RPC,
      action: PA.REJECT,
      name: 'addValues',
      correlationId: '1234',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.REJECT,
        { n: 'addValues', c: '1234' },
        ''
      ),
      args: ['name', 'correlationId'],
      payload: null
    }
  }),
  RESPONSE: m({
    message: {
      topic: TOPIC.RPC,
      action: PA.RESPONSE,
      name: 'addValues',
      correlationId: '1234',
      parsedData: { val1: 1, val2: 2 },
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.RESPONSE,
        { n: 'addValues', c: '1234' },
        { val1: 1, val2: 2 }
      ),
      args: ['name', 'correlationId'],
      payload: 'rpcData'
    }
  }),
  PROVIDE: m({
    message: {
      topic: TOPIC.RPC,
      action: PA.PROVIDE,
      name: 'addValues',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.PROVIDE,
        { n: 'addValues' },
        ''
      ),
      args: ['name'],
      payload: null
    }
  }),
  PROVIDE_ACK: m({
    message: {
      isAck: true,
      topic: TOPIC.RPC,
      action: PA.PROVIDE,
      name: 'addValues',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.PROVIDE_ACK,
        { n: 'addValues' },
        ''
      ),
      args: ['name'],
      payload: null
    }
  }),
  UNPROVIDE: m({
    message: {
      topic: TOPIC.RPC,
      action: PA.UNPROVIDE,
      name: 'addValues',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.UNPROVIDE,
        { n: 'addValues' },
        ''
      ),
      args: ['name'],
      payload: null
    }
  }),
  UNPROVIDE_ACK: m({
    message: {
      isAck: true,
      topic: TOPIC.RPC,
      action: PA.UNPROVIDE,
      name: 'addValues',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.UNPROVIDE_ACK,
        { n: 'addValues' },
        ''
      ),
      args: ['name'],
      payload: null
    }
  }),
  MULTIPLE_PROVIDERS: null,
  NOT_PROVIDED: null,
  MULTIPLE_RESPONSE: m({
    message: {
      isError: true,
      topic: TOPIC.RPC,
      action: PA.MULTIPLE_RESPONSE,
      name: 'addValues',
      correlationId: '1234',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.MULTIPLE_RESPONSE,
        { n: 'addValues', c: '1234' },
        ''
      ),
      args: ['name', 'correlationId'],
      payload: null
    }
  }),
  RESPONSE_TIMEOUT: m({
    message: {
      isError: true,
      topic: TOPIC.RPC,
      action: PA.RESPONSE_TIMEOUT,
      name: 'addValues',
      correlationId: '1234',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.RESPONSE_TIMEOUT,
        { n: 'addValues', c: '1234' },
        ''
      ),
      args: ['name', 'correlationId'],
      payload: null
    }
  }),
  INVALID_RPC_CORRELATION_ID: m({
    message: {
      isError: true,
      topic: TOPIC.RPC,
      action: PA.INVALID_RPC_CORRELATION_ID,
      name: 'addValues',
      correlationId: '/=/=/=/',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.INVALID_RPC_CORRELATION_ID,
        { n: 'addValues', c: '/=/=/=/' },
        ''
      ),
      args: ['name', 'correlationId'],
      payload: null
    }
  }),
  MULTIPLE_ACCEPT: m({
    message: {
      isError: true,
      topic: TOPIC.RPC,
      action: PA.MULTIPLE_ACCEPT,
      name: 'addValues',
      correlationId: '1234',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.MULTIPLE_ACCEPT,
        { n: 'addValues', c: '1234' },
        ''
      ),
      args: ['name', 'correlationId'],
      payload: null
    }
  }),
  ACCEPT_TIMEOUT: m({
    message: {
      isError: true,
      topic: TOPIC.RPC,
      action: PA.ACCEPT_TIMEOUT,
      name: 'addValues',
      correlationId: '1234',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.ACCEPT_TIMEOUT,
        { n: 'addValues', c: '1234' },
        ''
      ),
      args: ['name', 'correlationId'],
      payload: null
    }
  }),
  NO_RPC_PROVIDER: m({
    message: {
      isError: true,
      topic: TOPIC.RPC,
      action: PA.NO_RPC_PROVIDER,
      name: 'addValues',
      correlationId: '1234',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.NO_RPC_PROVIDER,
        { n: 'addValues', c: '1234' },
        ''
      ),
      args: ['name', 'correlationId'],
      payload: null
    }
  }),
  MESSAGE_PERMISSION_ERROR: m({
    message: {
      isError: true,
      topic: TOPIC.RPC,
      action: PA.MESSAGE_PERMISSION_ERROR,
      originalAction: PA.PROVIDE,
      name: 'username',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.MESSAGE_PERMISSION_ERROR,
        { n: 'username', a: PA.PROVIDE },
        ''
      ),
      args: ['name'],
      payload: null,
    }
  }),
  MESSAGE_DENIED: m({
    message: {
      isError: true,
      topic: TOPIC.RPC,
      action: PA.MESSAGE_DENIED,
      originalAction: PA.PROVIDE,
      name: 'username',
    },
    urp: {
      value: binMsg(
        TOPIC.RPC,
        PA.MESSAGE_DENIED,
        { n: 'username', a: PA.PROVIDE },
        ''
      ),
      args: ['name'],
      payload: null,
    }
  }),
  INVALID_MESSAGE_DATA: m({
    message: {
      isError: true,
      topic: TOPIC.RPC,
      action: PA.INVALID_MESSAGE_DATA,
      originalAction: PA.REQUEST
    },
    urp: {
      value: binMsg(TOPIC.RPC, PA.INVALID_MESSAGE_DATA, { a: PA.REQUEST }, ''),
      args: ['originalAction'],
      payload: 'rawData'
    }
  }),
  ERROR: null
}

export const EVENT_MESSAGES: { [key: string]: MessageSpec | null } = {
  EMIT: m({
    message: {
      topic: TOPIC.EVENT,
      action: EA.EMIT,
      name: 'someEvent',
      parsedData: 'data',
    },
    urp: {
      value: binMsg(TOPIC.EVENT, EA.EMIT, { n: 'someEvent' }, '"data"'),
      args: ['name'],
      payload: 'eventData',
      description: 'Sent to emit an event',
      source: 'server/client'
    }
  }),
  MESSAGE_PERMISSION_ERROR: m({
    message: {
      isError: true,
      topic: TOPIC.EVENT,
      action: EA.MESSAGE_PERMISSION_ERROR,
      originalAction: EA.SUBSCRIBE,
      name: 'username',
    },
    urp: {
      value: binMsg(
        TOPIC.EVENT,
        EA.MESSAGE_PERMISSION_ERROR,
        { n: 'username', a: EA.SUBSCRIBE },
        ''
      ),
      args: ['name'],
      payload: null,
    }
  }),
  MESSAGE_DENIED: m({
    message: {
      isError: true,
      topic: TOPIC.EVENT,
      action: EA.MESSAGE_DENIED,
      originalAction: EA.SUBSCRIBE,
      name: 'username',
    },
    urp: {
      value: binMsg(
        TOPIC.EVENT,
        EA.MESSAGE_DENIED,
        { n: 'username', a: EA.SUBSCRIBE },
        ''
      ),
      args: ['name'],
      payload: null,
    }
  }),
  INVALID_MESSAGE_DATA: m({
    message: {
      isError: true,
      topic: TOPIC.EVENT,
      action: EA.INVALID_MESSAGE_DATA,
      originalAction: EA.EMIT,
      name: 'eventName'
    },
    urp: {
      value: binMsg(TOPIC.EVENT, EA.INVALID_MESSAGE_DATA, { a: EA.EMIT, n: 'eventName' }, ''),
      args: ['originalAction'],
      payload: 'rawData'
    }
  }),
  ERROR: null
}
extendWithSubscriptionMessages(TOPIC.EVENT, EA, EVENT_MESSAGES)
extendWithListenMessages(TOPIC.EVENT, EA, EVENT_MESSAGES)

export const PRESENCE_MESSAGES: {[key: string]: MessageSpec | null} = {
  SUBSCRIBE: m({
    message: {
      topic: TOPIC.PRESENCE,
      action: UA.SUBSCRIBE,
      correlationId: '1234',
      names: ['alan', 'john'],
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.SUBSCRIBE,
        { c: '1234', m: ['alan', 'john'] },
        ''
      ),
      args: ['correlationId', 'names'],
      payload: null
    }
  }),
  SUBSCRIBE_ACK: m({
    message: {
      isAck: true,
      topic: TOPIC.PRESENCE,
      action: UA.SUBSCRIBE,
      correlationId: '1234'
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.SUBSCRIBE_ACK,
        { c: '1234' },
        ''
      ),
      args: ['correlationId'],
      payload: null
    }
  }),
  SUBSCRIBE_ALL: m({
    message: {
      topic: TOPIC.PRESENCE,
      action: UA.SUBSCRIBE_ALL,
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.SUBSCRIBE_ALL,
        '',
        ''
      ),
      args: [],
      payload: null
    }
  }),
  SUBSCRIBE_ALL_ACK: m({
    message: {
      isAck: true,
      topic: TOPIC.PRESENCE,
      action: UA.SUBSCRIBE_ALL,
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.SUBSCRIBE_ALL_ACK,
        '',
        ''
      ),
      args: [],
      payload: null
    }
  }),
  UNSUBSCRIBE: m({
    message: {
      topic: TOPIC.PRESENCE,
      action: UA.UNSUBSCRIBE,
      correlationId: '1234',
      names: ['alan', 'john'],
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.UNSUBSCRIBE,
        { c: '1234', m: ['alan', 'john'] },
        ''
      ),
      args: ['correlationId', 'names'],
      payload: null
    }
  }),
  UNSUBSCRIBE_ACK: m({
    message: {
      isAck: true,
      topic: TOPIC.PRESENCE,
      action: UA.UNSUBSCRIBE,
      correlationId: '1234',
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.UNSUBSCRIBE_ACK,
        { c: '1234' },
        ''
      ),
      args: ['correlationId'],
      payload: null
    }
  }),
  UNSUBSCRIBE_ALL: m({
    message: {
      topic: TOPIC.PRESENCE,
      action: UA.UNSUBSCRIBE_ALL,
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.UNSUBSCRIBE_ALL,
        '',
        ''
      ),
      args: [],
      payload: null
    }
  }),
  UNSUBSCRIBE_ALL_ACK: m({
    message: {
      isAck: true,
      topic: TOPIC.PRESENCE,
      action: UA.UNSUBSCRIBE_ALL,
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.UNSUBSCRIBE_ALL_ACK,
        '',
        ''
      ),
      args: [],
      payload: null
    }
  }),
  MULTIPLE_SUBSCRIPTIONS: null,
  NOT_SUBSCRIBED: null,
  QUERY_ALL: m({
    message: {
      topic: TOPIC.PRESENCE,
      action: UA.QUERY_ALL,
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.QUERY_ALL,
        '',
        ''
      ),
      args: [],
      payload: null
    }
  }),
  QUERY_ALL_RESPONSE: m({
    message: {
      topic: TOPIC.PRESENCE,
      action: UA.QUERY_ALL_RESPONSE,
      parsedData: ['alan', 'sarah'],
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.QUERY_ALL_RESPONSE,
        '',
        ['alan', 'sarah']
      ),
      args: [''],
      payload: null
    }
  }),
  QUERY: m({
    message: {
      topic: TOPIC.PRESENCE,
      action: UA.QUERY,
      correlationId: '1234',
      names: ['alan'],
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.QUERY,
        { c: '1234', m: ['alan'] },
        ''
      ),
      args: ['correlationId', 'names'],
      payload: null
    }
  }),
  QUERY_RESPONSE: m({
    message: {
      topic: TOPIC.PRESENCE,
      action: UA.QUERY_RESPONSE,
      correlationId: '1234',
      parsedData: { alan: true },
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.QUERY_RESPONSE,
        { c: '1234' },
        { alan: true }
      ),
      args: ['correlationId'],
      payload: 'userMap'
    }
  }),
  PRESENCE_JOIN: m({
    message: {
      topic: TOPIC.PRESENCE,
      action: UA.PRESENCE_JOIN,
      name: 'username',
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.PRESENCE_JOIN,
        { n: 'username' },
        ''
      ),
      args: ['name'],
      payload: null
    }
  }),
  PRESENCE_JOIN_ALL: m({
    message: {
      topic: TOPIC.PRESENCE,
      action: UA.PRESENCE_JOIN_ALL,
      name: 'username',
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.PRESENCE_JOIN_ALL,
        { n: 'username' },
        ''
      ),
      args: ['name'],
      payload: null
    }
  }),
  PRESENCE_LEAVE: m({
    message: {
      topic: TOPIC.PRESENCE,
      action: UA.PRESENCE_LEAVE,
      name: 'username',
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.PRESENCE_LEAVE,
        { n: 'username' },
        ''
      ),
      args: ['name'],
      payload: null
    }
  }),
  PRESENCE_LEAVE_ALL: m({
    message: {
      topic: TOPIC.PRESENCE,
      action: UA.PRESENCE_LEAVE_ALL,
      name: 'username',
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.PRESENCE_LEAVE_ALL,
        { n: 'username' },
        ''
      ),
      args: ['name'],
      payload: null
    }
  }),
  INVALID_PRESENCE_USERS: m({
    message: {
      isError: true,
      topic: TOPIC.PRESENCE,
      action: UA.INVALID_PRESENCE_USERS,
    },
    urp: {
      value: binMsg(TOPIC.PRESENCE, UA.INVALID_PRESENCE_USERS, '', ''),
      args: [],
      payload: null
    }
  }),
  MESSAGE_PERMISSION_ERROR: m({
    message: {
      isError: true,
      topic: TOPIC.PRESENCE,
      action: UA.MESSAGE_PERMISSION_ERROR,
      originalAction: UA.QUERY,
      name: 'username',
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.MESSAGE_PERMISSION_ERROR,
        { n: 'username', a: UA.QUERY },
        ''
      ),
      args: ['name'],
      payload: null,
    }
  }),
  MESSAGE_DENIED: m({
    message: {
      isError: true,
      topic: TOPIC.PRESENCE,
      action: UA.MESSAGE_DENIED,
      originalAction: UA.QUERY,
      name: 'username',
    },
    urp: {
      value: binMsg(
        TOPIC.PRESENCE,
        UA.MESSAGE_DENIED,
        { n: 'username', a: UA.QUERY },
        ''
      ),
      args: ['name'],
      payload: null,
    }
  }),
  ERROR: null
}

export const MESSAGES: {[key: number]: {[key: string]: MessageSpec | null}} = {
  [TOPIC.PARSER]: PARSER_MESSAGES,
  [TOPIC.RECORD]: RECORD_MESSAGES,
  [TOPIC.RPC]: RPC_MESSAGES,
  [TOPIC.EVENT]: EVENT_MESSAGES,
  [TOPIC.AUTH]: AUTH_MESSAGES,
  [TOPIC.CONNECTION]: CONNECTION_MESSAGES,
  [TOPIC.PRESENCE]: PRESENCE_MESSAGES,
}
