import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { notes } from 'mocks/handlers';
import { mockData } from 'mocks/mockData';

const seedMockData = () => {
  for (let i = 0; i < 5; i++) {
    mockData.note.create();
  }
};

const server = setupServer(...notes);

const findMockNoteById = (id: string) =>
  mockData.note.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

const getAllMockedNotes = () => mockData.note.getAll();

const getFirstMockNote = () => mockData.note.getAll()[0];

export { findMockNoteById, getAllMockedNotes, getFirstMockNote, rest, seedMockData, server };
