import {
  ACTIONS as constants,
  TOPIC,
} from '../src/message-constants'
import { reverseMap } from '../src/utils'
import { parse, parseData } from '../src/message-parser'
import { MESSAGES } from './messages'

const REVERSE_TOPIC = reverseMap(TOPIC)

describe('message parser', () => {
  for (const topicStr in MESSAGES) {
    const topic: TOPIC = Number(topicStr)
    for (const authAction in MESSAGES[topic]) {
      const spec = MESSAGES[topic][authAction]
      if (!spec) {
        console.log('no spec for', REVERSE_TOPIC[topic], authAction, '... skipping')
        continue
      }
      it (`parses ${TOPIC[topic]} messages ${authAction} correctly`, () => {
        const result = parse(spec.urp.value)[0]
        expect(result.parseError).toBeFalsy()
        if (!result.parseError) {
          expect(parseData(result)).toEqual(true)
          delete result.data
          expect(result).toEqual(spec.message)
        }
      })
    }
  }

})
