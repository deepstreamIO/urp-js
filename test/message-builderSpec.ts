import {
  ACTIONS as constants,
  TOPIC,
} from '../../../src/constants'
import { reverseMap } from '../../../src/utils/utils'
import { MESSAGES } from '../../text/src/messages'
import { getBinaryMessage } from '../src/message-builder'

const REVERSE_TOPIC = reverseMap(TOPIC)

describe('message builder', () => {
  for (const topicStr in MESSAGES) {
    const topic: TOPIC = Number(topicStr)
    if (topic !== TOPIC.CONNECTION && topic !== TOPIC.AUTH && topic !== TOPIC.RECORD) {
      continue
    }
    for (const authAction in MESSAGES[topic]) {
      const spec = MESSAGES[topic][authAction]
      if (!spec.urp || !spec.urp.value) {
        console.log('no spec for', REVERSE_TOPIC[topic], authAction, '... skipping')
        continue
      }
      it (`builds ${REVERSE_TOPIC[topic]} messages ${authAction} correctly`, () => {
        const message = spec.message
        const binary = getBinaryMessage(message)
        expect(binary).toEqual(
          spec.urp.value,
          `${binary.toString('utf8')} should be ${spec.urp.value.toString('utf8')}`,
        )
      })
    }
  }
})
