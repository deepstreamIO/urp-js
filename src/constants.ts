export const HEADER_LENGTH = 8
export const MAX_ARGS_LENGTH = Math.pow(2, 24) - 1
export const PAYLOAD_OVERFLOW_LENGTH = Math.pow(2, 24) - 1

export enum ARGUMENTS {
    name = 'n',
    correlationId = 'c',
    version = 'v',
    path = 'p',
    reason = 'r',
    url = 'u',
}
