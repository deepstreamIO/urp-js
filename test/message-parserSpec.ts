import {
  ACTIONS as constants,
  TOPIC,
} from '../../../src/constants'
import { reverseMap } from '../../../src/utils/utils'
import { MESSAGES } from '../../text/src/messages'
import { GenericMessage, parse, parseData } from '../src/message-parser'

const REVERSE_TOPIC = reverseMap(TOPIC)

describe('message parser', () => {
  for (const topicStr in MESSAGES) {
    const topic: TOPIC = Number(topicStr)
    for (const authAction in MESSAGES[topic]) {
      const spec = MESSAGES[topic][authAction]
      if (!spec || spec.urp === undefined) {
        console.log('no spec for', REVERSE_TOPIC[topic], authAction, '... skipping')
        continue
      }
      it (`parses ${TOPIC[topic]} messages ${authAction} correctly`, () => {
        const result = parse(spec.urp.value)[0]
        if (result.kind === 'Message') {
          expect(parseData(result)).toEqual(true)
          delete result.data
          delete result.kind
        }
        expect(result).toEqual(spec.message)
      })
    }
  }

})
