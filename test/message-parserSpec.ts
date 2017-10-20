import { MESSAGES } from '../../text/src/messages'
import { parse } from '../src/message-parser'
import {
  TOPIC,
  ACTIONS as constants
} from '../../../src/constants'

describe('message parser', () => {
  for (let topic in MESSAGES) {
    for (let authAction in MESSAGES[topic]) {
      if (!MESSAGES[topic][authAction] || MESSAGES[topic][authAction].text === undefined) {
        // it (`parses ${TOPIC[topic]} messages ${authAction} correctly`, () => {
        //  pending('Missing message')
        // })
      } else if (MESSAGES[topic][authAction].text.parse === true) {
        it (`parses ${TOPIC[topic]} messages ${authAction} correctly`, () => {
          expect(parse(MESSAGES[topic][authAction].text.value)).toEqual([MESSAGES[topic][authAction].message])
        })
      }
    }
  }

})
