import { CancelToken, del, get, post, put } from './apiClient';
import { AddNote, EditNote, Note, NoteInputs } from 'types';

type EditNoteProps = {
  noteId: string;
  note: EditNote;
};

export enum Endpoints {
  notes = '/api/notes',
}

export const getNotes = async (cancelToken: CancelToken) => {
  const { data } = await get<Note[]>(Endpoints.notes, cancelToken);

  return data;
};

export const addNote = async (note: AddNote) => {
  const { data } = await post<Note, AddNote>(Endpoints.notes, note);

  return data;
};

export const deleteNote = async (noteId: string) => {
  const { data } = await del(`${Endpoints.notes}/${noteId}`);

  return data;
};

export const editNote = async ({ noteId, note }: EditNoteProps) => {
  const { data } = await put<Note, NoteInputs>(`${Endpoints.notes}/${noteId}`, note);

  return data;
};
