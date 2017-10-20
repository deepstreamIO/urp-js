"use strict";
exports.__esModule = true;
var HEADER_LENGTH = 8;
var MAX_ARGS_LENGTH = Math.pow(2, 24) - 1;
var PAYLOAD_OVERFLOW_LENGTH = Math.pow(2, 24) - 1;
/*
 * Serialize a binary message
 * If a payload is provided it will be serialized as JSON
 *
 * @param topicByte  {Integer}             topic enum 0 <= n < 256
 * @param actionByte {Integer}             action enum 0 <= n < 256
 * @param data       {Buffer|Object|Value} a buffer to send, or some JSON.stringify-able value
 *
 * @returns {Buffer} the serialized data buffer
 *
 * @throws when length of serialized data is greater than MAX_ARGS_LENGTH
 * @throws if the data object contains circular references
 */
function getBinaryMessage(message, isAck) {
    var args = Object.create(null);
    args["n" /* name */] = message.name;
    args["c" /* correlationId */] = message.correlationId;
    args["v" /* version */] = message.version;
    args["p" /* path */] = message.path;
    var _a = objToBuff(args), metaBuff = _a.buffer, metaLength = _a.length;
    if (metaLength > MAX_ARGS_LENGTH) {
        throw new Error("Argument object too long: " + metaLength + " cannot be encoded in 24 bits");
    }
    var _b = objToBuff(message.data), payloadBuff = _b.buffer, payloadLength = _b.length;
    if (payloadLength > PAYLOAD_OVERFLOW_LENGTH) {
        throw new Error('payload overflow not implemented');
    }
    var continuation = 0x00; // (could be 0x80 in case of payload overflow)
    var messageBuffer = Buffer.allocUnsafe(HEADER_LENGTH + metaLength + payloadLength);
    messageBuffer[0] = continuation | message.topic;
    messageBuffer[1] = message.action;
    messageBuffer.writeUIntBE(metaLength, 2, 3);
    messageBuffer.writeUIntBE(payloadLength, 5, 3);
    if (metaBuff) {
        metaBuff.copy(messageBuffer, HEADER_LENGTH);
    }
    if (payloadBuff) {
        payloadBuff.copy(messageBuffer, HEADER_LENGTH + metaLength);
    }
    return messageBuffer;
}
exports.getBinaryMessage = getBinaryMessage;
function objToBuff(obj) {
    var str = JSON.stringify(obj);
    var buffer;
    var length;
    if (str.length > 2) {
        buffer = Buffer.from(str);
        length = buffer.byteLength;
    }
    else {
        length = 0;
        buffer = null;
    }
    return {
        buffer: buffer,
        length: length
    };
}
