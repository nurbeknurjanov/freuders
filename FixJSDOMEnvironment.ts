import JSDOMEnvironment from 'jest-environment-jsdom';

// https://github.com/facebook/jest/blob/v29.4.3/website/versioned_docs/version-29.4/Configuration.md#testenvironment-string
export default class FixJSDOMEnvironment extends JSDOMEnvironment {
    constructor(...args: ConstructorParameters<typeof JSDOMEnvironment>) {
        super(...args);

        this.global.ReadableStream = ReadableStream;
        this.global.TextDecoder = TextDecoder;
        this.global.TextEncoder = TextEncoder;

        this.global.Blob = Blob;
        this.global.File = File;
        this.global.FormData = FormData;
        this.global.fetch = fetch;
        this.global.Headers = Headers;
        this.global.Request = Request;
        this.global.Response = Response;
        this.global.AbortSignal = AbortSignal;
        // FIXME https://github.com/jsdom/jsdom/issues/3363
        this.global.structuredClone = structuredClone;

        this.global.ResizeObserver = class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    }
}
