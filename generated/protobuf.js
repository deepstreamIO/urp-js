/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * AUTH_ACTION enum.
 * @exports AUTH_ACTION
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} ERROR=1 ERROR value
 * @property {number} REQUEST=2 REQUEST value
 * @property {number} AUTH_SUCCESSFUL=3 AUTH_SUCCESSFUL value
 * @property {number} AUTH_UNSUCCESSFUL=4 AUTH_UNSUCCESSFUL value
 * @property {number} TOO_MANY_AUTH_ATTEMPTS=100 TOO_MANY_AUTH_ATTEMPTS value
 * @property {number} INVALID_MESSAGE=101 INVALID_MESSAGE value
 * @property {number} INVALID_MESSAGE_DATA=102 INVALID_MESSAGE_DATA value
 */
$root.AUTH_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "ERROR"] = 1;
    values[valuesById[2] = "REQUEST"] = 2;
    values[valuesById[3] = "AUTH_SUCCESSFUL"] = 3;
    values[valuesById[4] = "AUTH_UNSUCCESSFUL"] = 4;
    values[valuesById[100] = "TOO_MANY_AUTH_ATTEMPTS"] = 100;
    values[valuesById[101] = "INVALID_MESSAGE"] = 101;
    values[valuesById[102] = "INVALID_MESSAGE_DATA"] = 102;
    return values;
})();

$root.AuthMessage = (function() {

    /**
     * Properties of an AuthMessage.
     * @exports IAuthMessage
     * @interface IAuthMessage
     * @property {AUTH_ACTION} action AuthMessage action
     * @property {string|null} [data] AuthMessage data
     * @property {boolean|null} [isError] AuthMessage isError
     * @property {boolean|null} [isAck] AuthMessage isAck
     */

    /**
     * Constructs a new AuthMessage.
     * @exports AuthMessage
     * @classdesc Represents an AuthMessage.
     * @implements IAuthMessage
     * @constructor
     * @param {IAuthMessage=} [properties] Properties to set
     */
    function AuthMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AuthMessage action.
     * @member {AUTH_ACTION} action
     * @memberof AuthMessage
     * @instance
     */
    AuthMessage.prototype.action = 0;

    /**
     * AuthMessage data.
     * @member {string} data
     * @memberof AuthMessage
     * @instance
     */
    AuthMessage.prototype.data = "";

    /**
     * AuthMessage isError.
     * @member {boolean} isError
     * @memberof AuthMessage
     * @instance
     */
    AuthMessage.prototype.isError = false;

    /**
     * AuthMessage isAck.
     * @member {boolean} isAck
     * @memberof AuthMessage
     * @instance
     */
    AuthMessage.prototype.isAck = false;

    /**
     * Encodes the specified AuthMessage message. Does not implicitly {@link AuthMessage.verify|verify} messages.
     * @function encode
     * @memberof AuthMessage
     * @static
     * @param {IAuthMessage} message AuthMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && message.hasOwnProperty("data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.isError != null && message.hasOwnProperty("isError"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isError);
        if (message.isAck != null && message.hasOwnProperty("isAck"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isAck);
        return writer;
    };

    /**
     * Encodes the specified AuthMessage message, length delimited. Does not implicitly {@link AuthMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AuthMessage
     * @static
     * @param {IAuthMessage} message AuthMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AuthMessage message from the specified reader or buffer.
     * @function decode
     * @memberof AuthMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AuthMessage} AuthMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AuthMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.isError = reader.bool();
                break;
            case 4:
                message.isAck = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("action"))
            throw $util.ProtocolError("missing required 'action'", { instance: message });
        return message;
    };

    /**
     * Decodes an AuthMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AuthMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AuthMessage} AuthMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return AuthMessage;
})();

/**
 * CLUSTER_ACTION enum.
 * @exports CLUSTER_ACTION
 * @enum {string}
 * @property {number} UKNOWN=0 UKNOWN value
 * @property {number} REMOVE=1 REMOVE value
 * @property {number} STATUS=2 STATUS value
 */
$root.CLUSTER_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UKNOWN"] = 0;
    values[valuesById[1] = "REMOVE"] = 1;
    values[valuesById[2] = "STATUS"] = 2;
    return values;
})();

$root.ClusterMessage = (function() {

    /**
     * Properties of a ClusterMessage.
     * @exports IClusterMessage
     * @interface IClusterMessage
     * @property {CLUSTER_ACTION} action ClusterMessage action
     * @property {string|null} [data] ClusterMessage data
     * @property {boolean|null} [isError] ClusterMessage isError
     * @property {boolean|null} [isAck] ClusterMessage isAck
     * @property {number|null} [leaderScore] ClusterMessage leaderScore
     * @property {string|null} [externalUrl] ClusterMessage externalUrl
     * @property {string|null} [role] ClusterMessage role
     */

    /**
     * Constructs a new ClusterMessage.
     * @exports ClusterMessage
     * @classdesc Represents a ClusterMessage.
     * @implements IClusterMessage
     * @constructor
     * @param {IClusterMessage=} [properties] Properties to set
     */
    function ClusterMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ClusterMessage action.
     * @member {CLUSTER_ACTION} action
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.action = 0;

    /**
     * ClusterMessage data.
     * @member {string} data
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.data = "";

    /**
     * ClusterMessage isError.
     * @member {boolean} isError
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.isError = false;

    /**
     * ClusterMessage isAck.
     * @member {boolean} isAck
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.isAck = false;

    /**
     * ClusterMessage leaderScore.
     * @member {number} leaderScore
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.leaderScore = 0;

    /**
     * ClusterMessage externalUrl.
     * @member {string} externalUrl
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.externalUrl = "";

    /**
     * ClusterMessage role.
     * @member {string} role
     * @memberof ClusterMessage
     * @instance
     */
    ClusterMessage.prototype.role = "";

    /**
     * Encodes the specified ClusterMessage message. Does not implicitly {@link ClusterMessage.verify|verify} messages.
     * @function encode
     * @memberof ClusterMessage
     * @static
     * @param {IClusterMessage} message ClusterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClusterMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && message.hasOwnProperty("data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.isError != null && message.hasOwnProperty("isError"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isError);
        if (message.isAck != null && message.hasOwnProperty("isAck"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isAck);
        if (message.leaderScore != null && message.hasOwnProperty("leaderScore"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.leaderScore);
        if (message.externalUrl != null && message.hasOwnProperty("externalUrl"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.externalUrl);
        if (message.role != null && message.hasOwnProperty("role"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.role);
        return writer;
    };

    /**
     * Encodes the specified ClusterMessage message, length delimited. Does not implicitly {@link ClusterMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ClusterMessage
     * @static
     * @param {IClusterMessage} message ClusterMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClusterMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ClusterMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ClusterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ClusterMessage} ClusterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClusterMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ClusterMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.isError = reader.bool();
                break;
            case 4:
                message.isAck = reader.bool();
                break;
            case 5:
                message.leaderScore = reader.int32();
                break;
            case 6:
                message.externalUrl = reader.string();
                break;
            case 7:
                message.role = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("action"))
            throw $util.ProtocolError("missing required 'action'", { instance: message });
        return message;
    };

    /**
     * Decodes a ClusterMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ClusterMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ClusterMessage} ClusterMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClusterMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return ClusterMessage;
})();

/**
 * CONNECTION_ACTION enum.
 * @exports CONNECTION_ACTION
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} ERROR=1 ERROR value
 * @property {number} PING=2 PING value
 * @property {number} PONG=3 PONG value
 * @property {number} ACCEPT=4 ACCEPT value
 * @property {number} CHALLENGE=5 CHALLENGE value
 * @property {number} REJECT=6 REJECT value
 * @property {number} REDIRECT=7 REDIRECT value
 * @property {number} CLOSING=8 CLOSING value
 * @property {number} CLOSED=9 CLOSED value
 * @property {number} AUTHENTICATION_TIMEOUT=100 AUTHENTICATION_TIMEOUT value
 * @property {number} INVALID_MESSAGE=101 INVALID_MESSAGE value
 */
$root.CONNECTION_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "ERROR"] = 1;
    values[valuesById[2] = "PING"] = 2;
    values[valuesById[3] = "PONG"] = 3;
    values[valuesById[4] = "ACCEPT"] = 4;
    values[valuesById[5] = "CHALLENGE"] = 5;
    values[valuesById[6] = "REJECT"] = 6;
    values[valuesById[7] = "REDIRECT"] = 7;
    values[valuesById[8] = "CLOSING"] = 8;
    values[valuesById[9] = "CLOSED"] = 9;
    values[valuesById[100] = "AUTHENTICATION_TIMEOUT"] = 100;
    values[valuesById[101] = "INVALID_MESSAGE"] = 101;
    return values;
})();

$root.ConnectionMessage = (function() {

    /**
     * Properties of a ConnectionMessage.
     * @exports IConnectionMessage
     * @interface IConnectionMessage
     * @property {CONNECTION_ACTION} action ConnectionMessage action
     * @property {string|null} [data] ConnectionMessage data
     * @property {boolean|null} [isError] ConnectionMessage isError
     * @property {boolean|null} [isAck] ConnectionMessage isAck
     * @property {string|null} [url] ConnectionMessage url
     * @property {string|null} [protocolVersion] ConnectionMessage protocolVersion
     */

    /**
     * Constructs a new ConnectionMessage.
     * @exports ConnectionMessage
     * @classdesc Represents a ConnectionMessage.
     * @implements IConnectionMessage
     * @constructor
     * @param {IConnectionMessage=} [properties] Properties to set
     */
    function ConnectionMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ConnectionMessage action.
     * @member {CONNECTION_ACTION} action
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.action = 0;

    /**
     * ConnectionMessage data.
     * @member {string} data
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.data = "";

    /**
     * ConnectionMessage isError.
     * @member {boolean} isError
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.isError = false;

    /**
     * ConnectionMessage isAck.
     * @member {boolean} isAck
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.isAck = false;

    /**
     * ConnectionMessage url.
     * @member {string} url
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.url = "";

    /**
     * ConnectionMessage protocolVersion.
     * @member {string} protocolVersion
     * @memberof ConnectionMessage
     * @instance
     */
    ConnectionMessage.prototype.protocolVersion = "";

    /**
     * Encodes the specified ConnectionMessage message. Does not implicitly {@link ConnectionMessage.verify|verify} messages.
     * @function encode
     * @memberof ConnectionMessage
     * @static
     * @param {IConnectionMessage} message ConnectionMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ConnectionMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && message.hasOwnProperty("data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.isError != null && message.hasOwnProperty("isError"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isError);
        if (message.isAck != null && message.hasOwnProperty("isAck"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isAck);
        if (message.url != null && message.hasOwnProperty("url"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.url);
        if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.protocolVersion);
        return writer;
    };

    /**
     * Encodes the specified ConnectionMessage message, length delimited. Does not implicitly {@link ConnectionMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ConnectionMessage
     * @static
     * @param {IConnectionMessage} message ConnectionMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ConnectionMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ConnectionMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ConnectionMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ConnectionMessage} ConnectionMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ConnectionMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ConnectionMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.isError = reader.bool();
                break;
            case 4:
                message.isAck = reader.bool();
                break;
            case 5:
                message.url = reader.string();
                break;
            case 6:
                message.protocolVersion = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("action"))
            throw $util.ProtocolError("missing required 'action'", { instance: message });
        return message;
    };

    /**
     * Decodes a ConnectionMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ConnectionMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ConnectionMessage} ConnectionMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ConnectionMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return ConnectionMessage;
})();

/**
 * EVENT_ACTION enum.
 * @exports EVENT_ACTION
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} ERROR=1 ERROR value
 * @property {number} EMIT=2 EMIT value
 * @property {number} SUBSCRIBE=3 SUBSCRIBE value
 * @property {number} UNSUBSCRIBE=4 UNSUBSCRIBE value
 * @property {number} LISTEN=5 LISTEN value
 * @property {number} UNLISTEN=6 UNLISTEN value
 * @property {number} LISTEN_ACCEPT=7 LISTEN_ACCEPT value
 * @property {number} LISTEN_REJECT=8 LISTEN_REJECT value
 * @property {number} SUBSCRIPTION_HAS_PROVIDER=9 SUBSCRIPTION_HAS_PROVIDER value
 * @property {number} SUBSCRIPTION_HAS_NO_PROVIDER=10 SUBSCRIPTION_HAS_NO_PROVIDER value
 * @property {number} SUBSCRIPTION_FOR_PATTERN_FOUND=11 SUBSCRIPTION_FOR_PATTERN_FOUND value
 * @property {number} SUBSCRIPTION_FOR_PATTERN_REMOVED=12 SUBSCRIPTION_FOR_PATTERN_REMOVED value
 * @property {number} INVALID_LISTEN_REGEX=100 INVALID_LISTEN_REGEX value
 * @property {number} LISTEN_RESPONSE_TIMEOUT=101 LISTEN_RESPONSE_TIMEOUT value
 * @property {number} LISTEN_UNSUCCESSFUL=102 LISTEN_UNSUCCESSFUL value
 * @property {number} MESSAGE_PERMISSION_ERROR=103 MESSAGE_PERMISSION_ERROR value
 * @property {number} MESSAGE_DENIED=104 MESSAGE_DENIED value
 * @property {number} INVALID_MESSAGE_DATA=105 INVALID_MESSAGE_DATA value
 * @property {number} MULTIPLE_SUBSCRIPTIONS=106 MULTIPLE_SUBSCRIPTIONS value
 * @property {number} NOT_SUBSCRIBED=107 NOT_SUBSCRIBED value
 */
$root.EVENT_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "ERROR"] = 1;
    values[valuesById[2] = "EMIT"] = 2;
    values[valuesById[3] = "SUBSCRIBE"] = 3;
    values[valuesById[4] = "UNSUBSCRIBE"] = 4;
    values[valuesById[5] = "LISTEN"] = 5;
    values[valuesById[6] = "UNLISTEN"] = 6;
    values[valuesById[7] = "LISTEN_ACCEPT"] = 7;
    values[valuesById[8] = "LISTEN_REJECT"] = 8;
    values[valuesById[9] = "SUBSCRIPTION_HAS_PROVIDER"] = 9;
    values[valuesById[10] = "SUBSCRIPTION_HAS_NO_PROVIDER"] = 10;
    values[valuesById[11] = "SUBSCRIPTION_FOR_PATTERN_FOUND"] = 11;
    values[valuesById[12] = "SUBSCRIPTION_FOR_PATTERN_REMOVED"] = 12;
    values[valuesById[100] = "INVALID_LISTEN_REGEX"] = 100;
    values[valuesById[101] = "LISTEN_RESPONSE_TIMEOUT"] = 101;
    values[valuesById[102] = "LISTEN_UNSUCCESSFUL"] = 102;
    values[valuesById[103] = "MESSAGE_PERMISSION_ERROR"] = 103;
    values[valuesById[104] = "MESSAGE_DENIED"] = 104;
    values[valuesById[105] = "INVALID_MESSAGE_DATA"] = 105;
    values[valuesById[106] = "MULTIPLE_SUBSCRIPTIONS"] = 106;
    values[valuesById[107] = "NOT_SUBSCRIBED"] = 107;
    return values;
})();

$root.EventMessage = (function() {

    /**
     * Properties of an EventMessage.
     * @exports IEventMessage
     * @interface IEventMessage
     * @property {RPC_ACTION} action EventMessage action
     * @property {string|null} [data] EventMessage data
     * @property {string|null} [correlationId] EventMessage correlationId
     * @property {boolean|null} [isError] EventMessage isError
     * @property {boolean|null} [isAck] EventMessage isAck
     * @property {Array.<string>|null} [names] EventMessage names
     * @property {string|null} [subscription] EventMessage subscription
     * @property {TOPIC|null} [originalTOPIC] EventMessage originalTOPIC
     * @property {EVENT_ACTION|null} [originalAction] EventMessage originalAction
     */

    /**
     * Constructs a new EventMessage.
     * @exports EventMessage
     * @classdesc Represents an EventMessage.
     * @implements IEventMessage
     * @constructor
     * @param {IEventMessage=} [properties] Properties to set
     */
    function EventMessage(properties) {
        this.names = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * EventMessage action.
     * @member {RPC_ACTION} action
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.action = 0;

    /**
     * EventMessage data.
     * @member {string} data
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.data = "";

    /**
     * EventMessage correlationId.
     * @member {string} correlationId
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.correlationId = "";

    /**
     * EventMessage isError.
     * @member {boolean} isError
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.isError = false;

    /**
     * EventMessage isAck.
     * @member {boolean} isAck
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.isAck = false;

    /**
     * EventMessage names.
     * @member {Array.<string>} names
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.names = $util.emptyArray;

    /**
     * EventMessage subscription.
     * @member {string} subscription
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.subscription = "";

    /**
     * EventMessage originalTOPIC.
     * @member {TOPIC} originalTOPIC
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.originalTOPIC = 0;

    /**
     * EventMessage originalAction.
     * @member {EVENT_ACTION} originalAction
     * @memberof EventMessage
     * @instance
     */
    EventMessage.prototype.originalAction = 0;

    /**
     * Encodes the specified EventMessage message. Does not implicitly {@link EventMessage.verify|verify} messages.
     * @function encode
     * @memberof EventMessage
     * @static
     * @param {IEventMessage} message EventMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EventMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && message.hasOwnProperty("data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.correlationId != null && message.hasOwnProperty("correlationId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.correlationId);
        if (message.isError != null && message.hasOwnProperty("isError"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isError);
        if (message.isAck != null && message.hasOwnProperty("isAck"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isAck);
        if (message.names != null && message.names.length)
            for (var i = 0; i < message.names.length; ++i)
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.names[i]);
        if (message.subscription != null && message.hasOwnProperty("subscription"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.subscription);
        if (message.originalTOPIC != null && message.hasOwnProperty("originalTOPIC"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.originalTOPIC);
        if (message.originalAction != null && message.hasOwnProperty("originalAction"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.originalAction);
        return writer;
    };

    /**
     * Encodes the specified EventMessage message, length delimited. Does not implicitly {@link EventMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof EventMessage
     * @static
     * @param {IEventMessage} message EventMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    EventMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an EventMessage message from the specified reader or buffer.
     * @function decode
     * @memberof EventMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {EventMessage} EventMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EventMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.EventMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.correlationId = reader.string();
                break;
            case 4:
                message.isError = reader.bool();
                break;
            case 5:
                message.isAck = reader.bool();
                break;
            case 6:
                if (!(message.names && message.names.length))
                    message.names = [];
                message.names.push(reader.string());
                break;
            case 7:
                message.subscription = reader.string();
                break;
            case 8:
                message.originalTOPIC = reader.int32();
                break;
            case 9:
                message.originalAction = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("action"))
            throw $util.ProtocolError("missing required 'action'", { instance: message });
        return message;
    };

    /**
     * Decodes an EventMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof EventMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {EventMessage} EventMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    EventMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return EventMessage;
})();

/**
 * TOPIC enum.
 * @exports TOPIC
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} PARSER=1 PARSER value
 * @property {number} CONNECTION=2 CONNECTION value
 * @property {number} AUTH=3 AUTH value
 * @property {number} EVENT=4 EVENT value
 * @property {number} RECORD=5 RECORD value
 * @property {number} RPC=6 RPC value
 * @property {number} PRESENCE=7 PRESENCE value
 * @property {number} MONITORING=8 MONITORING value
 * @property {number} CLUSTER=9 CLUSTER value
 * @property {number} LOCK=10 LOCK value
 * @property {number} STATE_REGISTRY=11 STATE_REGISTRY value
 * @property {number} ERROR=100 ERROR value
 */
$root.TOPIC = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "PARSER"] = 1;
    values[valuesById[2] = "CONNECTION"] = 2;
    values[valuesById[3] = "AUTH"] = 3;
    values[valuesById[4] = "EVENT"] = 4;
    values[valuesById[5] = "RECORD"] = 5;
    values[valuesById[6] = "RPC"] = 6;
    values[valuesById[7] = "PRESENCE"] = 7;
    values[valuesById[8] = "MONITORING"] = 8;
    values[valuesById[9] = "CLUSTER"] = 9;
    values[valuesById[10] = "LOCK"] = 10;
    values[valuesById[11] = "STATE_REGISTRY"] = 11;
    values[valuesById[100] = "ERROR"] = 100;
    return values;
})();

$root.Message = (function() {

    /**
     * Properties of a Message.
     * @exports IMessage
     * @interface IMessage
     * @property {TOPIC|null} [topic] Message topic
     * @property {Uint8Array|null} [message] Message message
     */

    /**
     * Constructs a new Message.
     * @exports Message
     * @classdesc Represents a Message.
     * @implements IMessage
     * @constructor
     * @param {IMessage=} [properties] Properties to set
     */
    function Message(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Message topic.
     * @member {TOPIC} topic
     * @memberof Message
     * @instance
     */
    Message.prototype.topic = 0;

    /**
     * Message message.
     * @member {Uint8Array} message
     * @memberof Message
     * @instance
     */
    Message.prototype.message = $util.newBuffer([]);

    /**
     * Encodes the specified Message message. Does not implicitly {@link Message.verify|verify} messages.
     * @function encode
     * @memberof Message
     * @static
     * @param {IMessage} message Message message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Message.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.topic != null && message.hasOwnProperty("topic"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.topic);
        if (message.message != null && message.hasOwnProperty("message"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.message);
        return writer;
    };

    /**
     * Encodes the specified Message message, length delimited. Does not implicitly {@link Message.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Message
     * @static
     * @param {IMessage} message Message message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Message.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Message message from the specified reader or buffer.
     * @function decode
     * @memberof Message
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Message} Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Message.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Message();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 2:
                message.topic = reader.int32();
                break;
            case 3:
                message.message = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Message message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Message
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Message} Message
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Message.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return Message;
})();

/**
 * LOCK_ACTION enum.
 * @exports LOCK_ACTION
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} ERROR=1 ERROR value
 * @property {number} REQUEST=2 REQUEST value
 * @property {number} RESPONSE=3 RESPONSE value
 * @property {number} RELEASE=4 RELEASE value
 */
$root.LOCK_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "ERROR"] = 1;
    values[valuesById[2] = "REQUEST"] = 2;
    values[valuesById[3] = "RESPONSE"] = 3;
    values[valuesById[4] = "RELEASE"] = 4;
    return values;
})();

$root.LockMessage = (function() {

    /**
     * Properties of a LockMessage.
     * @exports ILockMessage
     * @interface ILockMessage
     * @property {LOCK_ACTION} action LockMessage action
     * @property {boolean|null} [locked] LockMessage locked
     */

    /**
     * Constructs a new LockMessage.
     * @exports LockMessage
     * @classdesc Represents a LockMessage.
     * @implements ILockMessage
     * @constructor
     * @param {ILockMessage=} [properties] Properties to set
     */
    function LockMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * LockMessage action.
     * @member {LOCK_ACTION} action
     * @memberof LockMessage
     * @instance
     */
    LockMessage.prototype.action = 0;

    /**
     * LockMessage locked.
     * @member {boolean} locked
     * @memberof LockMessage
     * @instance
     */
    LockMessage.prototype.locked = false;

    /**
     * Encodes the specified LockMessage message. Does not implicitly {@link LockMessage.verify|verify} messages.
     * @function encode
     * @memberof LockMessage
     * @static
     * @param {ILockMessage} message LockMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LockMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.locked != null && message.hasOwnProperty("locked"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.locked);
        return writer;
    };

    /**
     * Encodes the specified LockMessage message, length delimited. Does not implicitly {@link LockMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof LockMessage
     * @static
     * @param {ILockMessage} message LockMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LockMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a LockMessage message from the specified reader or buffer.
     * @function decode
     * @memberof LockMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {LockMessage} LockMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LockMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.LockMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 3:
                message.locked = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("action"))
            throw $util.ProtocolError("missing required 'action'", { instance: message });
        return message;
    };

    /**
     * Decodes a LockMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof LockMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {LockMessage} LockMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LockMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return LockMessage;
})();

/**
 * MONITORING_ACTION enum.
 * @exports MONITORING_ACTION
 * @enum {string}
 */
$root.MONITORING_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    return values;
})();

$root.MonitoringMessage = (function() {

    /**
     * Properties of a MonitoringMessage.
     * @exports IMonitoringMessage
     * @interface IMonitoringMessage
     * @property {RPC_ACTION} action MonitoringMessage action
     * @property {string|null} [data] MonitoringMessage data
     * @property {string|null} [correlationId] MonitoringMessage correlationId
     * @property {boolean|null} [isError] MonitoringMessage isError
     * @property {boolean|null} [isAck] MonitoringMessage isAck
     */

    /**
     * Constructs a new MonitoringMessage.
     * @exports MonitoringMessage
     * @classdesc Represents a MonitoringMessage.
     * @implements IMonitoringMessage
     * @constructor
     * @param {IMonitoringMessage=} [properties] Properties to set
     */
    function MonitoringMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MonitoringMessage action.
     * @member {RPC_ACTION} action
     * @memberof MonitoringMessage
     * @instance
     */
    MonitoringMessage.prototype.action = 0;

    /**
     * MonitoringMessage data.
     * @member {string} data
     * @memberof MonitoringMessage
     * @instance
     */
    MonitoringMessage.prototype.data = "";

    /**
     * MonitoringMessage correlationId.
     * @member {string} correlationId
     * @memberof MonitoringMessage
     * @instance
     */
    MonitoringMessage.prototype.correlationId = "";

    /**
     * MonitoringMessage isError.
     * @member {boolean} isError
     * @memberof MonitoringMessage
     * @instance
     */
    MonitoringMessage.prototype.isError = false;

    /**
     * MonitoringMessage isAck.
     * @member {boolean} isAck
     * @memberof MonitoringMessage
     * @instance
     */
    MonitoringMessage.prototype.isAck = false;

    /**
     * Encodes the specified MonitoringMessage message. Does not implicitly {@link MonitoringMessage.verify|verify} messages.
     * @function encode
     * @memberof MonitoringMessage
     * @static
     * @param {IMonitoringMessage} message MonitoringMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonitoringMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && message.hasOwnProperty("data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.correlationId != null && message.hasOwnProperty("correlationId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.correlationId);
        if (message.isError != null && message.hasOwnProperty("isError"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isError);
        if (message.isAck != null && message.hasOwnProperty("isAck"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isAck);
        return writer;
    };

    /**
     * Encodes the specified MonitoringMessage message, length delimited. Does not implicitly {@link MonitoringMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MonitoringMessage
     * @static
     * @param {IMonitoringMessage} message MonitoringMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MonitoringMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MonitoringMessage message from the specified reader or buffer.
     * @function decode
     * @memberof MonitoringMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MonitoringMessage} MonitoringMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonitoringMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MonitoringMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.correlationId = reader.string();
                break;
            case 4:
                message.isError = reader.bool();
                break;
            case 5:
                message.isAck = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("action"))
            throw $util.ProtocolError("missing required 'action'", { instance: message });
        return message;
    };

    /**
     * Decodes a MonitoringMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MonitoringMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MonitoringMessage} MonitoringMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MonitoringMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return MonitoringMessage;
})();

/**
 * PARSER_ACTION enum.
 * @exports PARSER_ACTION
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} UNKNOWN_TOPIC=1 UNKNOWN_TOPIC value
 * @property {number} UNKNOWN_ACTION=2 UNKNOWN_ACTION value
 * @property {number} INVALID_MESSAGE=3 INVALID_MESSAGE value
 * @property {number} MESSAGE_PARSE_ERROR=4 MESSAGE_PARSE_ERROR value
 * @property {number} MAXIMUM_MESSAGE_SIZE_EXCEEDED=5 MAXIMUM_MESSAGE_SIZE_EXCEEDED value
 * @property {number} ERROR=6 ERROR value
 * @property {number} INVALID_META_PARAMS=7 INVALID_META_PARAMS value
 */
$root.PARSER_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "UNKNOWN_TOPIC"] = 1;
    values[valuesById[2] = "UNKNOWN_ACTION"] = 2;
    values[valuesById[3] = "INVALID_MESSAGE"] = 3;
    values[valuesById[4] = "MESSAGE_PARSE_ERROR"] = 4;
    values[valuesById[5] = "MAXIMUM_MESSAGE_SIZE_EXCEEDED"] = 5;
    values[valuesById[6] = "ERROR"] = 6;
    values[valuesById[7] = "INVALID_META_PARAMS"] = 7;
    return values;
})();

$root.ParserMessage = (function() {

    /**
     * Properties of a ParserMessage.
     * @exports IParserMessage
     * @interface IParserMessage
     * @property {PARSER_ACTION} action ParserMessage action
     * @property {string|null} [data] ParserMessage data
     * @property {TOPIC|null} [originalTOPIC] ParserMessage originalTOPIC
     * @property {number|null} [originalAction] ParserMessage originalAction
     */

    /**
     * Constructs a new ParserMessage.
     * @exports ParserMessage
     * @classdesc Represents a ParserMessage.
     * @implements IParserMessage
     * @constructor
     * @param {IParserMessage=} [properties] Properties to set
     */
    function ParserMessage(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ParserMessage action.
     * @member {PARSER_ACTION} action
     * @memberof ParserMessage
     * @instance
     */
    ParserMessage.prototype.action = 0;

    /**
     * ParserMessage data.
     * @member {string} data
     * @memberof ParserMessage
     * @instance
     */
    ParserMessage.prototype.data = "";

    /**
     * ParserMessage originalTOPIC.
     * @member {TOPIC} originalTOPIC
     * @memberof ParserMessage
     * @instance
     */
    ParserMessage.prototype.originalTOPIC = 0;

    /**
     * ParserMessage originalAction.
     * @member {number} originalAction
     * @memberof ParserMessage
     * @instance
     */
    ParserMessage.prototype.originalAction = 0;

    /**
     * Encodes the specified ParserMessage message. Does not implicitly {@link ParserMessage.verify|verify} messages.
     * @function encode
     * @memberof ParserMessage
     * @static
     * @param {IParserMessage} message ParserMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ParserMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && message.hasOwnProperty("data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.originalTOPIC != null && message.hasOwnProperty("originalTOPIC"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.originalTOPIC);
        if (message.originalAction != null && message.hasOwnProperty("originalAction"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.originalAction);
        return writer;
    };

    /**
     * Encodes the specified ParserMessage message, length delimited. Does not implicitly {@link ParserMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ParserMessage
     * @static
     * @param {IParserMessage} message ParserMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ParserMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ParserMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ParserMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ParserMessage} ParserMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ParserMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ParserMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 8:
                message.originalTOPIC = reader.int32();
                break;
            case 9:
                message.originalAction = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("action"))
            throw $util.ProtocolError("missing required 'action'", { instance: message });
        return message;
    };

    /**
     * Decodes a ParserMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ParserMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ParserMessage} ParserMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ParserMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return ParserMessage;
})();

/**
 * PRESENCE_ACTION enum.
 * @exports PRESENCE_ACTION
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} ERROR=1 ERROR value
 * @property {number} QUERY_ALL=2 QUERY_ALL value
 * @property {number} QUERY_ALL_RESPONSE=3 QUERY_ALL_RESPONSE value
 * @property {number} QUERY=4 QUERY value
 * @property {number} QUERY_RESPONSE=5 QUERY_RESPONSE value
 * @property {number} PRESENCE_JOIN=6 PRESENCE_JOIN value
 * @property {number} PRESENCE_JOIN_ALL=7 PRESENCE_JOIN_ALL value
 * @property {number} PRESENCE_LEAVE=8 PRESENCE_LEAVE value
 * @property {number} PRESENCE_LEAVE_ALL=9 PRESENCE_LEAVE_ALL value
 * @property {number} SUBSCRIBE=10 SUBSCRIBE value
 * @property {number} UNSUBSCRIBE=11 UNSUBSCRIBE value
 * @property {number} SUBSCRIBE_ALL=12 SUBSCRIBE_ALL value
 * @property {number} UNSUBSCRIBE_ALL=13 UNSUBSCRIBE_ALL value
 * @property {number} INVALID_PRESENCE_USERS=100 INVALID_PRESENCE_USERS value
 * @property {number} MESSAGE_PERMISSION_ERROR=101 MESSAGE_PERMISSION_ERROR value
 * @property {number} MESSAGE_DENIED=102 MESSAGE_DENIED value
 * @property {number} MULTIPLE_SUBSCRIPTIONS=103 MULTIPLE_SUBSCRIPTIONS value
 * @property {number} NOT_SUBSCRIBED=104 NOT_SUBSCRIBED value
 */
$root.PRESENCE_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "ERROR"] = 1;
    values[valuesById[2] = "QUERY_ALL"] = 2;
    values[valuesById[3] = "QUERY_ALL_RESPONSE"] = 3;
    values[valuesById[4] = "QUERY"] = 4;
    values[valuesById[5] = "QUERY_RESPONSE"] = 5;
    values[valuesById[6] = "PRESENCE_JOIN"] = 6;
    values[valuesById[7] = "PRESENCE_JOIN_ALL"] = 7;
    values[valuesById[8] = "PRESENCE_LEAVE"] = 8;
    values[valuesById[9] = "PRESENCE_LEAVE_ALL"] = 9;
    values[valuesById[10] = "SUBSCRIBE"] = 10;
    values[valuesById[11] = "UNSUBSCRIBE"] = 11;
    values[valuesById[12] = "SUBSCRIBE_ALL"] = 12;
    values[valuesById[13] = "UNSUBSCRIBE_ALL"] = 13;
    values[valuesById[100] = "INVALID_PRESENCE_USERS"] = 100;
    values[valuesById[101] = "MESSAGE_PERMISSION_ERROR"] = 101;
    values[valuesById[102] = "MESSAGE_DENIED"] = 102;
    values[valuesById[103] = "MULTIPLE_SUBSCRIPTIONS"] = 103;
    values[valuesById[104] = "NOT_SUBSCRIBED"] = 104;
    return values;
})();

$root.PresenceMessage = (function() {

    /**
     * Properties of a PresenceMessage.
     * @exports IPresenceMessage
     * @interface IPresenceMessage
     * @property {PRESENCE_ACTION} action PresenceMessage action
     * @property {string|null} [data] PresenceMessage data
     * @property {string|null} [correlationId] PresenceMessage correlationId
     * @property {boolean|null} [isError] PresenceMessage isError
     * @property {boolean|null} [isAck] PresenceMessage isAck
     * @property {Array.<string>|null} [names] PresenceMessage names
     * @property {TOPIC|null} [originalTOPIC] PresenceMessage originalTOPIC
     * @property {number|null} [originalAction] PresenceMessage originalAction
     */

    /**
     * Constructs a new PresenceMessage.
     * @exports PresenceMessage
     * @classdesc Represents a PresenceMessage.
     * @implements IPresenceMessage
     * @constructor
     * @param {IPresenceMessage=} [properties] Properties to set
     */
    function PresenceMessage(properties) {
        this.names = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PresenceMessage action.
     * @member {PRESENCE_ACTION} action
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.action = 0;

    /**
     * PresenceMessage data.
     * @member {string} data
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.data = "";

    /**
     * PresenceMessage correlationId.
     * @member {string} correlationId
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.correlationId = "";

    /**
     * PresenceMessage isError.
     * @member {boolean} isError
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.isError = false;

    /**
     * PresenceMessage isAck.
     * @member {boolean} isAck
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.isAck = false;

    /**
     * PresenceMessage names.
     * @member {Array.<string>} names
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.names = $util.emptyArray;

    /**
     * PresenceMessage originalTOPIC.
     * @member {TOPIC} originalTOPIC
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.originalTOPIC = 0;

    /**
     * PresenceMessage originalAction.
     * @member {number} originalAction
     * @memberof PresenceMessage
     * @instance
     */
    PresenceMessage.prototype.originalAction = 0;

    /**
     * Encodes the specified PresenceMessage message. Does not implicitly {@link PresenceMessage.verify|verify} messages.
     * @function encode
     * @memberof PresenceMessage
     * @static
     * @param {IPresenceMessage} message PresenceMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PresenceMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && message.hasOwnProperty("data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.correlationId != null && message.hasOwnProperty("correlationId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.correlationId);
        if (message.isError != null && message.hasOwnProperty("isError"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isError);
        if (message.isAck != null && message.hasOwnProperty("isAck"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isAck);
        if (message.names != null && message.names.length)
            for (var i = 0; i < message.names.length; ++i)
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.names[i]);
        if (message.originalTOPIC != null && message.hasOwnProperty("originalTOPIC"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.originalTOPIC);
        if (message.originalAction != null && message.hasOwnProperty("originalAction"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.originalAction);
        return writer;
    };

    /**
     * Encodes the specified PresenceMessage message, length delimited. Does not implicitly {@link PresenceMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PresenceMessage
     * @static
     * @param {IPresenceMessage} message PresenceMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PresenceMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PresenceMessage message from the specified reader or buffer.
     * @function decode
     * @memberof PresenceMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PresenceMessage} PresenceMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PresenceMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PresenceMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.correlationId = reader.string();
                break;
            case 4:
                message.isError = reader.bool();
                break;
            case 5:
                message.isAck = reader.bool();
                break;
            case 6:
                if (!(message.names && message.names.length))
                    message.names = [];
                message.names.push(reader.string());
                break;
            case 7:
                message.originalTOPIC = reader.int32();
                break;
            case 8:
                message.originalAction = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("action"))
            throw $util.ProtocolError("missing required 'action'", { instance: message });
        return message;
    };

    /**
     * Decodes a PresenceMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PresenceMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PresenceMessage} PresenceMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PresenceMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return PresenceMessage;
})();

/**
 * RECORD_ACTION enum.
 * @exports RECORD_ACTION
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} ERROR=1 ERROR value
 * @property {number} NOTIFY=2 NOTIFY value
 * @property {number} READ=3 READ value
 * @property {number} READ_RESPONSE=4 READ_RESPONSE value
 * @property {number} HEAD=5 HEAD value
 * @property {number} HEAD_RESPONSE=6 HEAD_RESPONSE value
 * @property {number} HEAD_BULK=7 HEAD_BULK value
 * @property {number} HEAD_RESPONSE_BULK=8 HEAD_RESPONSE_BULK value
 * @property {number} DELETE=9 DELETE value
 * @property {number} DELETE_SUCCESS=10 DELETE_SUCCESS value
 * @property {number} DELETE_BULK=11 DELETE_BULK value
 * @property {number} DELETE_BULK_SUCCESS=12 DELETE_BULK_SUCCESS value
 * @property {number} DELETED=13 DELETED value
 * @property {number} WRITE_ACKNOWLEDGEMENT=14 WRITE_ACKNOWLEDGEMENT value
 * @property {number} CREATE=15 CREATE value
 * @property {number} CREATEANDUPDATE=16 CREATEANDUPDATE value
 * @property {number} CREATEANDPATCH=17 CREATEANDPATCH value
 * @property {number} UPDATE=18 UPDATE value
 * @property {number} PATCH=19 PATCH value
 * @property {number} ERASE=20 ERASE value
 * @property {number} SUBSCRIBEANDHEAD=21 SUBSCRIBEANDHEAD value
 * @property {number} SUBSCRIBEANDREAD=22 SUBSCRIBEANDREAD value
 * @property {number} SUBSCRIBECREATEANDREAD=23 SUBSCRIBECREATEANDREAD value
 * @property {number} SUBSCRIBECREATEANDUPDATE=24 SUBSCRIBECREATEANDUPDATE value
 * @property {number} SUBSCRIBE=25 SUBSCRIBE value
 * @property {number} UNSUBSCRIBE=26 UNSUBSCRIBE value
 * @property {number} LISTEN=27 LISTEN value
 * @property {number} UNLISTEN=28 UNLISTEN value
 * @property {number} LISTEN_ACCEPT=29 LISTEN_ACCEPT value
 * @property {number} LISTEN_REJECT=30 LISTEN_REJECT value
 * @property {number} SUBSCRIPTION_HAS_PROVIDER=31 SUBSCRIPTION_HAS_PROVIDER value
 * @property {number} SUBSCRIPTION_HAS_NO_PROVIDER=32 SUBSCRIPTION_HAS_NO_PROVIDER value
 * @property {number} SUBSCRIPTION_FOR_PATTERN_FOUND=33 SUBSCRIPTION_FOR_PATTERN_FOUND value
 * @property {number} SUBSCRIPTION_FOR_PATTERN_REMOVED=34 SUBSCRIPTION_FOR_PATTERN_REMOVED value
 * @property {number} CACHE_RETRIEVAL_TIMEOUT=100 CACHE_RETRIEVAL_TIMEOUT value
 * @property {number} STORAGE_RETRIEVAL_TIMEOUT=101 STORAGE_RETRIEVAL_TIMEOUT value
 * @property {number} VERSION_EXISTS=102 VERSION_EXISTS value
 * @property {number} RECORD_LOAD_ERROR=103 RECORD_LOAD_ERROR value
 * @property {number} RECORD_CREATE_ERROR=104 RECORD_CREATE_ERROR value
 * @property {number} RECORD_UPDATE_ERROR=105 RECORD_UPDATE_ERROR value
 * @property {number} RECORD_DELETE_ERROR=106 RECORD_DELETE_ERROR value
 * @property {number} RECORD_NOT_FOUND=107 RECORD_NOT_FOUND value
 * @property {number} INVALID_VERSION=108 INVALID_VERSION value
 * @property {number} INVALID_PATCH_ON_HOTPATH=109 INVALID_PATCH_ON_HOTPATH value
 * @property {number} INVALID_LISTEN_REGEX=110 INVALID_LISTEN_REGEX value
 * @property {number} LISTEN_RESPONSE_TIMEOUT=111 LISTEN_RESPONSE_TIMEOUT value
 * @property {number} LISTEN_UNSUCCESSFUL=112 LISTEN_UNSUCCESSFUL value
 * @property {number} RECORD_NOTIFY_ERROR=113 RECORD_NOTIFY_ERROR value
 * @property {number} MESSAGE_PERMISSION_ERROR=114 MESSAGE_PERMISSION_ERROR value
 * @property {number} MESSAGE_DENIED=115 MESSAGE_DENIED value
 * @property {number} INVALID_MESSAGE_DATA=116 INVALID_MESSAGE_DATA value
 * @property {number} MULTIPLE_SUBSCRIPTIONS=117 MULTIPLE_SUBSCRIPTIONS value
 * @property {number} NOT_SUBSCRIBED=118 NOT_SUBSCRIBED value
 */
$root.RECORD_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "ERROR"] = 1;
    values[valuesById[2] = "NOTIFY"] = 2;
    values[valuesById[3] = "READ"] = 3;
    values[valuesById[4] = "READ_RESPONSE"] = 4;
    values[valuesById[5] = "HEAD"] = 5;
    values[valuesById[6] = "HEAD_RESPONSE"] = 6;
    values[valuesById[7] = "HEAD_BULK"] = 7;
    values[valuesById[8] = "HEAD_RESPONSE_BULK"] = 8;
    values[valuesById[9] = "DELETE"] = 9;
    values[valuesById[10] = "DELETE_SUCCESS"] = 10;
    values[valuesById[11] = "DELETE_BULK"] = 11;
    values[valuesById[12] = "DELETE_BULK_SUCCESS"] = 12;
    values[valuesById[13] = "DELETED"] = 13;
    values[valuesById[14] = "WRITE_ACKNOWLEDGEMENT"] = 14;
    values[valuesById[15] = "CREATE"] = 15;
    values[valuesById[16] = "CREATEANDUPDATE"] = 16;
    values[valuesById[17] = "CREATEANDPATCH"] = 17;
    values[valuesById[18] = "UPDATE"] = 18;
    values[valuesById[19] = "PATCH"] = 19;
    values[valuesById[20] = "ERASE"] = 20;
    values[valuesById[21] = "SUBSCRIBEANDHEAD"] = 21;
    values[valuesById[22] = "SUBSCRIBEANDREAD"] = 22;
    values[valuesById[23] = "SUBSCRIBECREATEANDREAD"] = 23;
    values[valuesById[24] = "SUBSCRIBECREATEANDUPDATE"] = 24;
    values[valuesById[25] = "SUBSCRIBE"] = 25;
    values[valuesById[26] = "UNSUBSCRIBE"] = 26;
    values[valuesById[27] = "LISTEN"] = 27;
    values[valuesById[28] = "UNLISTEN"] = 28;
    values[valuesById[29] = "LISTEN_ACCEPT"] = 29;
    values[valuesById[30] = "LISTEN_REJECT"] = 30;
    values[valuesById[31] = "SUBSCRIPTION_HAS_PROVIDER"] = 31;
    values[valuesById[32] = "SUBSCRIPTION_HAS_NO_PROVIDER"] = 32;
    values[valuesById[33] = "SUBSCRIPTION_FOR_PATTERN_FOUND"] = 33;
    values[valuesById[34] = "SUBSCRIPTION_FOR_PATTERN_REMOVED"] = 34;
    values[valuesById[100] = "CACHE_RETRIEVAL_TIMEOUT"] = 100;
    values[valuesById[101] = "STORAGE_RETRIEVAL_TIMEOUT"] = 101;
    values[valuesById[102] = "VERSION_EXISTS"] = 102;
    values[valuesById[103] = "RECORD_LOAD_ERROR"] = 103;
    values[valuesById[104] = "RECORD_CREATE_ERROR"] = 104;
    values[valuesById[105] = "RECORD_UPDATE_ERROR"] = 105;
    values[valuesById[106] = "RECORD_DELETE_ERROR"] = 106;
    values[valuesById[107] = "RECORD_NOT_FOUND"] = 107;
    values[valuesById[108] = "INVALID_VERSION"] = 108;
    values[valuesById[109] = "INVALID_PATCH_ON_HOTPATH"] = 109;
    values[valuesById[110] = "INVALID_LISTEN_REGEX"] = 110;
    values[valuesById[111] = "LISTEN_RESPONSE_TIMEOUT"] = 111;
    values[valuesById[112] = "LISTEN_UNSUCCESSFUL"] = 112;
    values[valuesById[113] = "RECORD_NOTIFY_ERROR"] = 113;
    values[valuesById[114] = "MESSAGE_PERMISSION_ERROR"] = 114;
    values[valuesById[115] = "MESSAGE_DENIED"] = 115;
    values[valuesById[116] = "INVALID_MESSAGE_DATA"] = 116;
    values[valuesById[117] = "MULTIPLE_SUBSCRIPTIONS"] = 117;
    values[valuesById[118] = "NOT_SUBSCRIBED"] = 118;
    return values;
})();

$root.RecordMessage = (function() {

    /**
     * Properties of a RecordMessage.
     * @exports IRecordMessage
     * @interface IRecordMessage
     * @property {RECORD_ACTION} action RecordMessage action
     * @property {string|null} [data] RecordMessage data
     * @property {string|null} [correlationId] RecordMessage correlationId
     * @property {boolean|null} [isError] RecordMessage isError
     * @property {Array.<string>|null} [names] RecordMessage names
     * @property {boolean|null} [isAck] RecordMessage isAck
     * @property {string|null} [pattern] RecordMessage pattern
     * @property {string|null} [subscription] RecordMessage subscription
     * @property {RECORD_ACTION|null} [originalAction] RecordMessage originalAction
     * @property {boolean|null} [isWriteAck] RecordMessage isWriteAck
     * @property {string|null} [path] RecordMessage path
     * @property {number|null} [version] RecordMessage version
     * @property {Object.<string,number>|null} [versions] RecordMessage versions
     */

    /**
     * Constructs a new RecordMessage.
     * @exports RecordMessage
     * @classdesc Represents a RecordMessage.
     * @implements IRecordMessage
     * @constructor
     * @param {IRecordMessage=} [properties] Properties to set
     */
    function RecordMessage(properties) {
        this.names = [];
        this.versions = {};
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RecordMessage action.
     * @member {RECORD_ACTION} action
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.action = 0;

    /**
     * RecordMessage data.
     * @member {string} data
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.data = "";

    /**
     * RecordMessage correlationId.
     * @member {string} correlationId
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.correlationId = "";

    /**
     * RecordMessage isError.
     * @member {boolean} isError
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.isError = false;

    /**
     * RecordMessage names.
     * @member {Array.<string>} names
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.names = $util.emptyArray;

    /**
     * RecordMessage isAck.
     * @member {boolean} isAck
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.isAck = false;

    /**
     * RecordMessage pattern.
     * @member {string} pattern
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.pattern = "";

    /**
     * RecordMessage subscription.
     * @member {string} subscription
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.subscription = "";

    /**
     * RecordMessage originalAction.
     * @member {RECORD_ACTION} originalAction
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.originalAction = 0;

    /**
     * RecordMessage isWriteAck.
     * @member {boolean} isWriteAck
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.isWriteAck = false;

    /**
     * RecordMessage path.
     * @member {string} path
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.path = "";

    /**
     * RecordMessage version.
     * @member {number} version
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.version = 0;

    /**
     * RecordMessage versions.
     * @member {Object.<string,number>} versions
     * @memberof RecordMessage
     * @instance
     */
    RecordMessage.prototype.versions = $util.emptyObject;

    /**
     * Encodes the specified RecordMessage message. Does not implicitly {@link RecordMessage.verify|verify} messages.
     * @function encode
     * @memberof RecordMessage
     * @static
     * @param {IRecordMessage} message RecordMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RecordMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && message.hasOwnProperty("data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.correlationId != null && message.hasOwnProperty("correlationId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.correlationId);
        if (message.isError != null && message.hasOwnProperty("isError"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isError);
        if (message.names != null && message.names.length)
            for (var i = 0; i < message.names.length; ++i)
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.names[i]);
        if (message.isAck != null && message.hasOwnProperty("isAck"))
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.isAck);
        if (message.pattern != null && message.hasOwnProperty("pattern"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.pattern);
        if (message.subscription != null && message.hasOwnProperty("subscription"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.subscription);
        if (message.originalAction != null && message.hasOwnProperty("originalAction"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.originalAction);
        if (message.isWriteAck != null && message.hasOwnProperty("isWriteAck"))
            writer.uint32(/* id 10, wireType 0 =*/80).bool(message.isWriteAck);
        if (message.path != null && message.hasOwnProperty("path"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.path);
        if (message.version != null && message.hasOwnProperty("version"))
            writer.uint32(/* id 12, wireType 0 =*/96).int32(message.version);
        if (message.versions != null && message.hasOwnProperty("versions"))
            for (var keys = Object.keys(message.versions), i = 0; i < keys.length; ++i)
                writer.uint32(/* id 13, wireType 2 =*/106).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 0 =*/16).int32(message.versions[keys[i]]).ldelim();
        return writer;
    };

    /**
     * Encodes the specified RecordMessage message, length delimited. Does not implicitly {@link RecordMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RecordMessage
     * @static
     * @param {IRecordMessage} message RecordMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RecordMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RecordMessage message from the specified reader or buffer.
     * @function decode
     * @memberof RecordMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RecordMessage} RecordMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RecordMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RecordMessage(), key;
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.correlationId = reader.string();
                break;
            case 4:
                message.isError = reader.bool();
                break;
            case 5:
                if (!(message.names && message.names.length))
                    message.names = [];
                message.names.push(reader.string());
                break;
            case 6:
                message.isAck = reader.bool();
                break;
            case 7:
                message.pattern = reader.string();
                break;
            case 8:
                message.subscription = reader.string();
                break;
            case 9:
                message.originalAction = reader.int32();
                break;
            case 10:
                message.isWriteAck = reader.bool();
                break;
            case 11:
                message.path = reader.string();
                break;
            case 12:
                message.version = reader.int32();
                break;
            case 13:
                reader.skip().pos++;
                if (message.versions === $util.emptyObject)
                    message.versions = {};
                key = reader.string();
                reader.pos++;
                message.versions[key] = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("action"))
            throw $util.ProtocolError("missing required 'action'", { instance: message });
        return message;
    };

    /**
     * Decodes a RecordMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RecordMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RecordMessage} RecordMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RecordMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return RecordMessage;
})();

/**
 * RPC_ACTION enum.
 * @exports RPC_ACTION
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} ERROR=1 ERROR value
 * @property {number} REQUEST=2 REQUEST value
 * @property {number} ACCEPT=4 ACCEPT value
 * @property {number} RESPONSE=5 RESPONSE value
 * @property {number} REJECT=6 REJECT value
 * @property {number} REQUEST_ERROR=7 REQUEST_ERROR value
 * @property {number} PROVIDE=8 PROVIDE value
 * @property {number} UNPROVIDE=9 UNPROVIDE value
 * @property {number} NO_RPC_PROVIDER=100 NO_RPC_PROVIDER value
 * @property {number} ACCEPT_TIMEOUT=101 ACCEPT_TIMEOUT value
 * @property {number} MULTIPLE_ACCEPT=102 MULTIPLE_ACCEPT value
 * @property {number} INVALID_RPC_CORRELATION_ID=103 INVALID_RPC_CORRELATION_ID value
 * @property {number} RESPONSE_TIMEOUT=104 RESPONSE_TIMEOUT value
 * @property {number} MULTIPLE_RESPONSE=105 MULTIPLE_RESPONSE value
 * @property {number} MESSAGE_PERMISSION_ERROR=106 MESSAGE_PERMISSION_ERROR value
 * @property {number} MESSAGE_DENIED=107 MESSAGE_DENIED value
 * @property {number} INVALID_MESSAGE_DATA=108 INVALID_MESSAGE_DATA value
 * @property {number} MULTIPLE_PROVIDERS=109 MULTIPLE_PROVIDERS value
 * @property {number} NOT_PROVIDED=110 NOT_PROVIDED value
 */
$root.RPC_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "ERROR"] = 1;
    values[valuesById[2] = "REQUEST"] = 2;
    values[valuesById[4] = "ACCEPT"] = 4;
    values[valuesById[5] = "RESPONSE"] = 5;
    values[valuesById[6] = "REJECT"] = 6;
    values[valuesById[7] = "REQUEST_ERROR"] = 7;
    values[valuesById[8] = "PROVIDE"] = 8;
    values[valuesById[9] = "UNPROVIDE"] = 9;
    values[valuesById[100] = "NO_RPC_PROVIDER"] = 100;
    values[valuesById[101] = "ACCEPT_TIMEOUT"] = 101;
    values[valuesById[102] = "MULTIPLE_ACCEPT"] = 102;
    values[valuesById[103] = "INVALID_RPC_CORRELATION_ID"] = 103;
    values[valuesById[104] = "RESPONSE_TIMEOUT"] = 104;
    values[valuesById[105] = "MULTIPLE_RESPONSE"] = 105;
    values[valuesById[106] = "MESSAGE_PERMISSION_ERROR"] = 106;
    values[valuesById[107] = "MESSAGE_DENIED"] = 107;
    values[valuesById[108] = "INVALID_MESSAGE_DATA"] = 108;
    values[valuesById[109] = "MULTIPLE_PROVIDERS"] = 109;
    values[valuesById[110] = "NOT_PROVIDED"] = 110;
    return values;
})();

$root.RpcMessage = (function() {

    /**
     * Properties of a RpcMessage.
     * @exports IRpcMessage
     * @interface IRpcMessage
     * @property {RPC_ACTION} action RpcMessage action
     * @property {string|null} [data] RpcMessage data
     * @property {string|null} [correlationId] RpcMessage correlationId
     * @property {boolean|null} [isError] RpcMessage isError
     * @property {boolean|null} [isAck] RpcMessage isAck
     * @property {Array.<string>|null} [names] RpcMessage names
     * @property {string|null} [name] RpcMessage name
     * @property {string|null} [reason] RpcMessage reason
     * @property {number|null} [originalAction] RpcMessage originalAction
     */

    /**
     * Constructs a new RpcMessage.
     * @exports RpcMessage
     * @classdesc Represents a RpcMessage.
     * @implements IRpcMessage
     * @constructor
     * @param {IRpcMessage=} [properties] Properties to set
     */
    function RpcMessage(properties) {
        this.names = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RpcMessage action.
     * @member {RPC_ACTION} action
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.action = 0;

    /**
     * RpcMessage data.
     * @member {string} data
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.data = "";

    /**
     * RpcMessage correlationId.
     * @member {string} correlationId
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.correlationId = "";

    /**
     * RpcMessage isError.
     * @member {boolean} isError
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.isError = false;

    /**
     * RpcMessage isAck.
     * @member {boolean} isAck
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.isAck = false;

    /**
     * RpcMessage names.
     * @member {Array.<string>} names
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.names = $util.emptyArray;

    /**
     * RpcMessage name.
     * @member {string} name
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.name = "";

    /**
     * RpcMessage reason.
     * @member {string} reason
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.reason = "";

    /**
     * RpcMessage originalAction.
     * @member {number} originalAction
     * @memberof RpcMessage
     * @instance
     */
    RpcMessage.prototype.originalAction = 0;

    /**
     * Encodes the specified RpcMessage message. Does not implicitly {@link RpcMessage.verify|verify} messages.
     * @function encode
     * @memberof RpcMessage
     * @static
     * @param {IRpcMessage} message RpcMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RpcMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && message.hasOwnProperty("data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.correlationId != null && message.hasOwnProperty("correlationId"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.correlationId);
        if (message.isError != null && message.hasOwnProperty("isError"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isError);
        if (message.isAck != null && message.hasOwnProperty("isAck"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isAck);
        if (message.names != null && message.names.length)
            for (var i = 0; i < message.names.length; ++i)
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.names[i]);
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.name);
        if (message.reason != null && message.hasOwnProperty("reason"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.reason);
        if (message.originalAction != null && message.hasOwnProperty("originalAction"))
            writer.uint32(/* id 9, wireType 0 =*/72).int32(message.originalAction);
        return writer;
    };

    /**
     * Encodes the specified RpcMessage message, length delimited. Does not implicitly {@link RpcMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RpcMessage
     * @static
     * @param {IRpcMessage} message RpcMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RpcMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RpcMessage message from the specified reader or buffer.
     * @function decode
     * @memberof RpcMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RpcMessage} RpcMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RpcMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RpcMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.correlationId = reader.string();
                break;
            case 4:
                message.isError = reader.bool();
                break;
            case 5:
                message.isAck = reader.bool();
                break;
            case 6:
                if (!(message.names && message.names.length))
                    message.names = [];
                message.names.push(reader.string());
                break;
            case 7:
                message.name = reader.string();
                break;
            case 8:
                message.reason = reader.string();
                break;
            case 9:
                message.originalAction = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("action"))
            throw $util.ProtocolError("missing required 'action'", { instance: message });
        return message;
    };

    /**
     * Decodes a RpcMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RpcMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RpcMessage} RpcMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RpcMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return RpcMessage;
})();

/**
 * STATE_REGISTRY_TOPIC enum.
 * @exports STATE_REGISTRY_TOPIC
 * @enum {string}
 * @property {number} EVENT_SUBSCRIPTIONS=11 EVENT_SUBSCRIPTIONS value
 * @property {number} RECORD_SUBSCRIPTIONS=12 RECORD_SUBSCRIPTIONS value
 * @property {number} SUBSCRIPTIONS=9 SUBSCRIPTIONS value
 * @property {number} ONLINE_USERS=10 ONLINE_USERS value
 * @property {number} MONITORING_SUBSCRIPTIONS=24 MONITORING_SUBSCRIPTIONS value
 * @property {number} RPC_SUBSCRIPTIONS=13 RPC_SUBSCRIPTIONS value
 * @property {number} PRESENCE_SUBSCRIPTIONS=14 PRESENCE_SUBSCRIPTIONS value
 * @property {number} RECORD_LISTEN_PATTERNS=15 RECORD_LISTEN_PATTERNS value
 * @property {number} EVENT_LISTEN_PATTERNS=16 EVENT_LISTEN_PATTERNS value
 * @property {number} RECORD_PUBLISHED_SUBSCRIPTIONS=17 RECORD_PUBLISHED_SUBSCRIPTIONS value
 * @property {number} EVENT_PUBLISHED_SUBSCRIPTIONS=18 EVENT_PUBLISHED_SUBSCRIPTIONS value
 * @property {number} RECORD_LISTENING=19 RECORD_LISTENING value
 * @property {number} EVENT_LISTENING=20 EVENT_LISTENING value
 * @property {number} STATE_REGISTRY=21 STATE_REGISTRY value
 */
$root.STATE_REGISTRY_TOPIC = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[11] = "EVENT_SUBSCRIPTIONS"] = 11;
    values[valuesById[12] = "RECORD_SUBSCRIPTIONS"] = 12;
    values[valuesById[9] = "SUBSCRIPTIONS"] = 9;
    values[valuesById[10] = "ONLINE_USERS"] = 10;
    values[valuesById[24] = "MONITORING_SUBSCRIPTIONS"] = 24;
    values[valuesById[13] = "RPC_SUBSCRIPTIONS"] = 13;
    values[valuesById[14] = "PRESENCE_SUBSCRIPTIONS"] = 14;
    values[valuesById[15] = "RECORD_LISTEN_PATTERNS"] = 15;
    values[valuesById[16] = "EVENT_LISTEN_PATTERNS"] = 16;
    values[valuesById[17] = "RECORD_PUBLISHED_SUBSCRIPTIONS"] = 17;
    values[valuesById[18] = "EVENT_PUBLISHED_SUBSCRIPTIONS"] = 18;
    values[valuesById[19] = "RECORD_LISTENING"] = 19;
    values[valuesById[20] = "EVENT_LISTENING"] = 20;
    values[valuesById[21] = "STATE_REGISTRY"] = 21;
    return values;
})();

/**
 * STATE_ACTION enum.
 * @exports STATE_ACTION
 * @enum {string}
 * @property {number} UNKNOWN=0 UNKNOWN value
 * @property {number} ERROR=1 ERROR value
 * @property {number} ADD=2 ADD value
 * @property {number} REMOVE=3 REMOVE value
 * @property {number} REQUEST_FULL_STATE=4 REQUEST_FULL_STATE value
 * @property {number} FULL_STATE=5 FULL_STATE value
 * @property {number} CHECKSUM=6 CHECKSUM value
 */
$root.STATE_ACTION = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN"] = 0;
    values[valuesById[1] = "ERROR"] = 1;
    values[valuesById[2] = "ADD"] = 2;
    values[valuesById[3] = "REMOVE"] = 3;
    values[valuesById[4] = "REQUEST_FULL_STATE"] = 4;
    values[valuesById[5] = "FULL_STATE"] = 5;
    values[valuesById[6] = "CHECKSUM"] = 6;
    return values;
})();

$root.StateMessage = (function() {

    /**
     * Properties of a StateMessage.
     * @exports IStateMessage
     * @interface IStateMessage
     * @property {STATE_ACTION} action StateMessage action
     * @property {string|null} [data] StateMessage data
     * @property {boolean|null} [isError] StateMessage isError
     * @property {number|null} [checksum] StateMessage checksum
     * @property {Array.<string>|null} [fullState] StateMessage fullState
     * @property {string|null} [serverName] StateMessage serverName
     * @property {STATE_REGISTRY_TOPIC|null} [registryTOPIC] StateMessage registryTOPIC
     */

    /**
     * Constructs a new StateMessage.
     * @exports StateMessage
     * @classdesc Represents a StateMessage.
     * @implements IStateMessage
     * @constructor
     * @param {IStateMessage=} [properties] Properties to set
     */
    function StateMessage(properties) {
        this.fullState = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * StateMessage action.
     * @member {STATE_ACTION} action
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.action = 0;

    /**
     * StateMessage data.
     * @member {string} data
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.data = "";

    /**
     * StateMessage isError.
     * @member {boolean} isError
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.isError = false;

    /**
     * StateMessage checksum.
     * @member {number} checksum
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.checksum = 0;

    /**
     * StateMessage fullState.
     * @member {Array.<string>} fullState
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.fullState = $util.emptyArray;

    /**
     * StateMessage serverName.
     * @member {string} serverName
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.serverName = "";

    /**
     * StateMessage registryTOPIC.
     * @member {STATE_REGISTRY_TOPIC} registryTOPIC
     * @memberof StateMessage
     * @instance
     */
    StateMessage.prototype.registryTOPIC = 11;

    /**
     * Encodes the specified StateMessage message. Does not implicitly {@link StateMessage.verify|verify} messages.
     * @function encode
     * @memberof StateMessage
     * @static
     * @param {IStateMessage} message StateMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StateMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.data != null && message.hasOwnProperty("data"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
        if (message.isError != null && message.hasOwnProperty("isError"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isError);
        if (message.checksum != null && message.hasOwnProperty("checksum"))
            writer.uint32(/* id 19, wireType 0 =*/152).int32(message.checksum);
        if (message.fullState != null && message.fullState.length)
            for (var i = 0; i < message.fullState.length; ++i)
                writer.uint32(/* id 20, wireType 2 =*/162).string(message.fullState[i]);
        if (message.serverName != null && message.hasOwnProperty("serverName"))
            writer.uint32(/* id 21, wireType 2 =*/170).string(message.serverName);
        if (message.registryTOPIC != null && message.hasOwnProperty("registryTOPIC"))
            writer.uint32(/* id 22, wireType 0 =*/176).int32(message.registryTOPIC);
        return writer;
    };

    /**
     * Encodes the specified StateMessage message, length delimited. Does not implicitly {@link StateMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof StateMessage
     * @static
     * @param {IStateMessage} message StateMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StateMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a StateMessage message from the specified reader or buffer.
     * @function decode
     * @memberof StateMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {StateMessage} StateMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StateMessage.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.StateMessage();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.data = reader.string();
                break;
            case 3:
                message.isError = reader.bool();
                break;
            case 19:
                message.checksum = reader.int32();
                break;
            case 20:
                if (!(message.fullState && message.fullState.length))
                    message.fullState = [];
                message.fullState.push(reader.string());
                break;
            case 21:
                message.serverName = reader.string();
                break;
            case 22:
                message.registryTOPIC = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        if (!message.hasOwnProperty("action"))
            throw $util.ProtocolError("missing required 'action'", { instance: message });
        return message;
    };

    /**
     * Decodes a StateMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof StateMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {StateMessage} StateMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StateMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    return StateMessage;
})();

module.exports = $root;
