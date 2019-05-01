import {
  TOPIC,
  EVENT_ACTIONS,
  Message
} from '../src/message-constants'
import { getMessage } from '../src/message-builder'
import { parse, parseData } from '../src/message-parser'
import { MESSAGES } from './messages'
import { expect } from 'chai'

describe('message builder', () => {
  describe('specs', () => {
    for (const topicStr in MESSAGES) {
      const topic: TOPIC = Number(topicStr)
      if (topic !== TOPIC.CONNECTION && topic !== TOPIC.AUTH && topic !== TOPIC.RECORD) {
        continue
      }
      for (const actionName in MESSAGES[topic]) {
        const spec = MESSAGES[topic][actionName]
        if (!spec) {
          console.log('no spec for', TOPIC[topic], actionName, '... skipping')
          continue
        }
        it (`builds ${TOPIC[topic]} messages ${actionName} correctly`, () => {
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

          console.log(binary, spec.urp.value, message)
          expect(binary).to.deep.equal(
            spec.urp.value,
            // `${binary.toString('utf8')} should be ${spec.urp.value.toString('utf8')}`,
          )
        })
      }
    }

  })

  describe('multipart messages', () => {
    it('should build messages with very long names', () => {
      const message: Message = {
        topic: TOPIC.EVENT,
        action: EVENT_ACTIONS.EMIT,
        name: 'a'.repeat(Math.pow(2, 26)),
        isAck: false,
        isError: false
      }
      const binary = getMessage(message, false)
      const parseResults = parse(binary)
      expect(parseResults.length).to.equal(1)
      const parsedMessage = parseResults[0] as Message

      delete parsedMessage.data
      // expect(parsedMessage).to.equal(message)
    })

    it('should build messages with very long payloads', () => {
      const message: Message = {
        topic: TOPIC.EVENT,
        action: EVENT_ACTIONS.EMIT,
        name: 'foo',
        isAck: false,
        isError: false,
        parsedData: { x: 'why'.repeat(Math.pow(2, 25)) }
      }
      const binary = getMessage(message, false)
      const parseResults = parse(binary)
      expect(parseResults.length).to.equal(1)
      const parsedMessage = parseResults[0] as Message
      expect(parseData(parsedMessage)).to.equal(true)

      delete parsedMessage.data
      // expect(parsedMessage).to.equal(message)
    })
  })
})
