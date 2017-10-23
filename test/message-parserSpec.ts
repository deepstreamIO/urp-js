import {
  ACTIONS as constants,
  TOPIC,
} from '../../../src/constants'
import { reverseMap } from '../../../src/utils/utils'
import { MESSAGES } from '../../text/src/messages'
import { GenericMessage, parse, parseData } from '../src/message-parser'

const REVERSE_TOPIC = reverseMap(TOPIC)

fdescribe('message parser', () => {
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
          const err = parseData(result)
          if (err !== true) {
            console.log('data parser error!', err)
          }
        }
        console.log(result, '=======', spec.message, '\n\n')
        for (const k in spec.message) {
          if (k !== 'data') {
            expect(result[k]).toEqual(
              spec.message[k],
              `message.${k} should be ${spec.message[k]} but was ${result[k]}`,
            )
          }
        }
      })
    }
  }

})
