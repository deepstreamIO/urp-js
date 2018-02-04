"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_constants_1 = require("../src/message-constants");
const message_parser_1 = require("../src/message-parser");
const messages_1 = require("./messages");
const chai_1 = require("chai");
describe('message parser', () => {
    for (const topicStr in messages_1.MESSAGES) {
        const topic = Number(topicStr);
        for (const authAction in messages_1.MESSAGES[topic]) {
            const spec = messages_1.MESSAGES[topic][authAction];
            if (!spec) {
                console.log('no spec for', message_constants_1.TOPIC[topic], authAction, '... skipping');
                continue;
            }
            it(`parses ${message_constants_1.TOPIC[topic]} messages ${authAction} correctly`, () => {
                const result = message_parser_1.parse(spec.urp.value)[0];
                chai_1.expect(result.parseError).to.be.an('undefined');
                if (!result.parseError &&
                    (!result.payloadEncoding || result.payloadEncoding === message_constants_1.PAYLOAD_ENCODING.JSON)) {
                    chai_1.expect(message_parser_1.parseData(result)).to.equal(true);
                }
                chai_1.expect(result).to.deep.equal(spec.message);
            });
        }
    }
});
//# sourceMappingURL=message-parserSpec.js.map