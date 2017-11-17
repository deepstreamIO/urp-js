import { RECORD_ACTIONS as RA } from './message-constants'

export function isWriteAck (action: RA): boolean {
  return action === RA.CREATEANDPATCH_WITH_WRITE_ACK
      || action === RA.CREATEANDUPDATE_WITH_WRITE_ACK
      || action === RA.PATCH_WITH_WRITE_ACK
      || action === RA.UPDATE_WITH_WRITE_ACK
      || action === RA.ERASE_WITH_WRITE_ACK
      || action === RA.WRITE_ACKNOWLEDGEMENT
}

export const ACTION_TO_WRITE_ACK: { [key: number]: RA } = {
  [RA.CREATEANDPATCH]: RA.CREATEANDPATCH_WITH_WRITE_ACK,
  [RA.CREATEANDUPDATE]: RA.CREATEANDUPDATE_WITH_WRITE_ACK,
  [RA.PATCH]: RA.PATCH_WITH_WRITE_ACK,
  [RA.UPDATE]: RA.UPDATE_WITH_WRITE_ACK,
  [RA.ERASE]: RA.ERASE_WITH_WRITE_ACK,
}

/**
 * Like reverseMap but the values will be cast using Number(k)
 */
export function reverseMapNumeric (map: { [k: number]: number }): { [k: number]: number } {
  const reversedMap: { [k: number]: number } = {}

  for (const key in map) {
    reversedMap[map[key]] = Number(key)
  }

  return reversedMap
}

export const WRITE_ACK_TO_ACTION = reverseMapNumeric(ACTION_TO_WRITE_ACK)
