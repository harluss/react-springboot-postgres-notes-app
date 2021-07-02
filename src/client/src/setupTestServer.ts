import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { notes } from 'mocks/handlers';

const server = setupServer(...notes);

beforeAll(() => server.listen());
afterAll(() => server.close());
beforeEach(() => server.resetHandlers());

export { server, rest };
