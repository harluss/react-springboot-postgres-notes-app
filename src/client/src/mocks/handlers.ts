import { Endpoints } from 'api/notesAPI';
import { rest } from 'msw';
import { NoteInputs } from 'types';
import { mockData } from './mockData';

export const notes = [
  rest.get(`${Endpoints.notes}`, (_, res, ctx) => {
    const dummyNotes = mockData.note.getAll();

    return res(ctx.status(200), ctx.json(dummyNotes));
  }),
  rest.post(`${Endpoints.notes}`, (req, res, ctx) => {
    const newNoteData = req.body as NoteInputs;

    const newNote = mockData.note.create({
      ...newNoteData,
    });

    return res(ctx.status(201), ctx.json(newNote));
  }),
  rest.put(`${Endpoints.notes}/:id`, (req, res, ctx) => {
    const editedNoteData = req.body as NoteInputs;
    const noteId = req.params.id as string;

    if (!noteId) {
      return res(ctx.status(400));
    }

    const updatedNote = mockData.note.update({
      where: {
        id: {
          equals: noteId,
        },
      },
      data: {
        ...editedNoteData,
      },
    });

    if (!updatedNote) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(updatedNote));
  }),
  rest.delete(`${Endpoints.notes}/:id`, (req, res, ctx) => {
    const noteId = req.params.id as string;

    if (!noteId) {
      return res(ctx.status(400));
    }

    const deletedNote = mockData.note.delete({
      where: {
        id: {
          equals: noteId,
        },
      },
    });

    if (!deletedNote) {
      return res(ctx.status(404));
    }

    return res(ctx.status(204));
  }),
];
