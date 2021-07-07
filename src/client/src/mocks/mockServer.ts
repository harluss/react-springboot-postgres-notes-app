import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { notes } from 'mocks/handlers';
import { mockData } from 'mocks/mockData';

const seedMockData = () => {
  for (let i = 0; i < 5; i++) {
    mockData.note.create();
  }
};

seedMockData();

const server = setupServer(...notes);

export { rest, server };
