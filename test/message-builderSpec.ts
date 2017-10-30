import {
  RECORD_ACTIONS,
  TOPIC,
} from '../src/message-constants'
import { reverseMap } from '../src/utils'
import { getMessage } from '../src/message-builder'
import { MESSAGES } from './messages'

const REVERSE_TOPIC = reverseMap(TOPIC)

describe('message builder', () => {
  for (const topicStr in MESSAGES) {
    const topic: TOPIC = Number(topicStr)
    if (topic !== TOPIC.CONNECTION && topic !== TOPIC.AUTH && topic !== TOPIC.RECORD) {
      continue
    }
    for (const actionName in MESSAGES[topic]) {
      const spec = MESSAGES[topic][actionName]
      if (!spec) {
        console.log('no spec for', REVERSE_TOPIC[topic], actionName, '... skipping')
        continue
      }
      it (`builds ${REVERSE_TOPIC[topic]} messages ${actionName} correctly`, () => {
        const message = spec.message
        const binary = getMessage(message, false)

        /*
         *console.log(
         *  `${
         *    JSON.stringify(binary.slice(0, 8))}${binary.toString('utf8', 8)
         *    } should be ${
         *      JSON.stringify(spec.urp.value.slice(0, 8))}${spec.urp.value.toString('utf8', 8)}`
         *)
         */
        expect(binary).toEqual(
          spec.urp.value,
          `${binary.toString('utf8')} should be ${spec.urp.value.toString('utf8')}`,
        )
      })
    }
  }
})
