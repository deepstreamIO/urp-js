import {
  ACTIONS,
  TOPIC,
} from '../src/message-constants'

import {
  reverseMap,
} from '../src/utils'

const ACTIONS_BYTE_TO_KEY = {}
for (const key in ACTIONS) {
  ACTIONS_BYTE_TO_KEY[key] = reverseMap(ACTIONS[key])
}

import { MESSAGES } from './messages'

describe('protocol', () => {
  for (const topic in ACTIONS) {
    for (const action in ACTIONS[topic]) {
      if (isNaN(Number(action))) {
        it (`contains message for ${TOPIC[topic]} with action ${action} in protocol`, () => {
         expect(MESSAGES[topic][action]).toBeDefined()
        })
      } else {
        it (`contains topic ${TOPIC[topic]} with action ${ACTIONS[topic][action]} in protocol`, () => {
          expect(ACTIONS_BYTE_TO_KEY[topic][action]).toBeDefined()
        })
      }
    }
  }
})
