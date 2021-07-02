import { Endpoints } from 'api/notesAPI';
import { rest } from 'msw';
import { generateDummyNote } from './mockData';

export const notes = [
  rest.put(`${Endpoints.notes}/:id`, (_, res, ctx) => {
    const dummyNote = generateDummyNote;
    console.log(dummyNote);
    return res(ctx.status(200), ctx.json(dummyNote));
  }),
];
