import { Endpoints } from 'api/notesAPI';
import { rest } from 'msw';
import { Note, NoteInputs } from 'types';
import { generateDummyNote, mockData } from './mockData';

export const notes = [
  rest.get(`${Endpoints.notes}`, (_, res, ctx) => {
    const dummyNotes = mockData.note.getAll();

    console.log('@@@@@@@@@');

    return res(ctx.status(200), ctx.json(dummyNotes));
  }),
  rest.post(`${Endpoints.notes}`, (req, res, ctx) => {
    const newNoteData = req.body as NoteInputs;
    const dummyNote = generateDummyNote();

    const newNote: Note = { ...dummyNote, ...newNoteData };

    return res(ctx.status(201), ctx.json(newNote));
  }),
  rest.put(`${Endpoints.notes}/:id`, (req, res, ctx) => {
    const editedNoteData = req.body as NoteInputs;
    const dummyNote = generateDummyNote();

    const editedNote: Note = { ...dummyNote, ...editedNoteData };

    return res(ctx.status(200), ctx.json(editedNote));
  }),
  rest.delete(`${Endpoints.notes}/:id`, (_, res, ctx) => {
    return res(ctx.status(204));
  }),
];
