export class WsApiException {
    constructor({
                    code,
                    message,
                    data,
                    debug
                }: { code: number, message: string, data: Record<string, unknown> | string, debug: Record<string, unknown> }) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.debug = debug;
    }

    code: number
    message: string
    data: Record<string, unknown> | string
    debug?: Record<string, unknown>
}