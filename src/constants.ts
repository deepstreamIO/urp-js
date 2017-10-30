import {
  TOPIC,
  RECORD_ACTIONS as RA,
} from '../../../src/constants'

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

export function isWriteAck (action: RECORD_ACTIONS): boolean {
  return action === RA.CREATEANDPATCH_WITH_WRITE_ACK
      || action === RA.CREATEANDUPDATE_WITH_WRITE_ACK
      || action === RA.PATCH_WITH_WRITE_ACK
      || action === RA.UPDATE_WITH_WRITE_ACK
      || action === RA.ERASE_WITH_WRITE_ACK
}

export const actionToWriteAck: { [key: number]: RECORD_ACTIONS } = {
  [RA.CREATEANDPATCH]: RA.CREATEANDPATCH_WITH_WRITE_ACK,
  [RA.CREATEANDUPDATE]: RA.CREATEANDUPDATE_WITH_WRITE_ACK,
  [RA.PATCH]: RA.PATCH_WITH_WRITE_ACK,
  [RA.UPDATE]: RA.UPDATE_WITH_WRITE_ACK,
  [RA.ERASE]: RA.ERASE_WITH_WRITE_ACK,
}

export const writeAckToAction: { [key: number]: RECORD_ACTIONS } = reverseMapNumeric(actionToWriteAck)

export const TOPIC_BYTE_TO_KEY = reverseMap(TOPIC)
export const ACTIONS_BYTE_TO_KEY = {}

/**
 * Takes a key-value map and returns
 * a map with { value: key } of the old map
 */
function reverseMap (map) {
  const reversedMap = {}

  for (const key in map) {
    reversedMap[map[key]] = key
  }

  return reversedMap
}

/**
 * Like reverseMap but the values will be cast using Number(k)
 */
function reverseMapNumeric (map: { [k: number]: number }) {
  const reversedMap = {}

  for (const key in map) {
    reversedMap[map[key]] = Number(key)
  }

  return reversedMap
}
