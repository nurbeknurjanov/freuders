import '@testing-library/jest-dom';
/*import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });*/
import { setupServer } from 'msw/node';
import { requestsHandlers } from './src/tests';

/*
  Setup MSW Server for mocking requests during tests
*/
export const server = setupServer(...requestsHandlers);

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
