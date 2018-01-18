/// <reference types="node" />
import { Message } from '../src/message-constants';
export interface MessageSpec {
    message: Message;
    urp: {
        value: Buffer;
        args: Array<String>;
        payload: string | null;
        description?: string;
        source?: 'server' | 'client' | 'server/client';
    };
}
export declare const PARSER_MESSAGES: {
    [key: string]: MessageSpec | null;
};
export declare const CONNECTION_MESSAGES: {
    [key: string]: MessageSpec | null;
};
export declare const AUTH_MESSAGES: {
    [key: string]: MessageSpec | null;
};
export declare const RECORD_MESSAGES: {
    [key: string]: MessageSpec | null;
};
export declare const RPC_MESSAGES: {
    [key: string]: MessageSpec | null;
};
export declare const EVENT_MESSAGES: {
    [key: string]: MessageSpec | null;
};
export declare const PRESENCE_MESSAGES: {
    [key: string]: MessageSpec | null;
};
export declare const MESSAGES: {
    [key: number]: {
        [key: string]: MessageSpec | null;
    };
};
