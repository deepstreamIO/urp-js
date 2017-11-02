import {
  TOPIC,
  RECORD_ACTIONS as RA,
} from './message-constants'

import {
  convertMap,
  reverseMap,
  reverseMapNumeric,
} from './utils'

export const HEADER_LENGTH = 8
export const MAX_ARGS_LENGTH = Math.pow(2, 24) - 1
export const PAYLOAD_OVERFLOW_LENGTH = Math.pow(2, 24) - 1

export enum ARGUMENTS {
    name = 'n',
    subscription = 's',
    correlationId = 'c',
    payloadEncoding = 'e',
    version = 'v',
    path = 'p',
    reason = 'r',
    url = 'u',
}

export function isWriteAck (action: RA): boolean {
  return action === RA.CREATEANDPATCH_WITH_WRITE_ACK
      || action === RA.CREATEANDUPDATE_WITH_WRITE_ACK
      || action === RA.PATCH_WITH_WRITE_ACK
      || action === RA.UPDATE_WITH_WRITE_ACK
      || action === RA.ERASE_WITH_WRITE_ACK
}

export const actionToWriteAck: { [key: number]: RA } = {
  [RA.CREATEANDPATCH]: RA.CREATEANDPATCH_WITH_WRITE_ACK,
  [RA.CREATEANDUPDATE]: RA.CREATEANDUPDATE_WITH_WRITE_ACK,
  [RA.PATCH]: RA.PATCH_WITH_WRITE_ACK,
  [RA.UPDATE]: RA.UPDATE_WITH_WRITE_ACK,
  [RA.ERASE]: RA.ERASE_WITH_WRITE_ACK,
}

export const writeAckToAction: { [key: number]: RA } = reverseMapNumeric(actionToWriteAck)

export const TOPIC_BYTE_TO_KEY = reverseMap(TOPIC)
export const TOPIC_BYTE_TO_TEXT = convertMap(TOPIC, 'BYTE', 'TEXT')
export const ACTIONS_BYTE_TO_KEY = {}
