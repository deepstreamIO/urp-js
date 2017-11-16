import {
  TOPIC,
  ACTIONS,
  RECORD_ACTIONS as RA,
} from './message-constants'

import {
  reverseMapNumeric,
} from './utils'

export const HEADER_LENGTH = 8
export const META_PAYLOAD_OVERFLOW_LENGTH = Math.pow(2, 24) - 1

export function isWriteAck (action: RA): boolean {
  return action === RA.CREATEANDPATCH_WITH_WRITE_ACK
      || action === RA.CREATEANDUPDATE_WITH_WRITE_ACK
      || action === RA.PATCH_WITH_WRITE_ACK
      || action === RA.UPDATE_WITH_WRITE_ACK
      || action === RA.ERASE_WITH_WRITE_ACK
      || action === RA.WRITE_ACKNOWLEDGEMENT
}

export const actionToWriteAck: { [key: number]: RA } = {
  [RA.CREATEANDPATCH]: RA.CREATEANDPATCH_WITH_WRITE_ACK,
  [RA.CREATEANDUPDATE]: RA.CREATEANDUPDATE_WITH_WRITE_ACK,
  [RA.PATCH]: RA.PATCH_WITH_WRITE_ACK,
  [RA.UPDATE]: RA.UPDATE_WITH_WRITE_ACK,
  [RA.ERASE]: RA.ERASE_WITH_WRITE_ACK,
}
