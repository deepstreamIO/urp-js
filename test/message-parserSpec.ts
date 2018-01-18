import {
  TOPIC,
  PAYLOAD_ENCODING,
} from '../src/message-constants'
import { parse, parseData } from '../src/message-parser'
import { MESSAGES } from './messages'
import { expect } from 'chai'

describe('message parser', () => {
  for (const topicStr in MESSAGES) {
    const topic: TOPIC = Number(topicStr)
    for (const authAction in MESSAGES[topic]) {
      const spec = MESSAGES[topic][authAction]
      if (!spec) {
        console.log('no spec for', TOPIC[topic], authAction, '... skipping')
        continue
      }
      it (`parses ${TOPIC[topic]} messages ${authAction} correctly`, () => {
        const result = parse(spec.urp.value)[0]
        expect(result.parseError).to.be.undefined
        if (!result.parseError &&
          (!result.payloadEncoding || result.payloadEncoding === PAYLOAD_ENCODING.JSON)
        ) {
          expect(parseData(result)).to.equal(true)
        }
        expect(result).to.deep.equal(spec.message)
      })
    }
  }

})
