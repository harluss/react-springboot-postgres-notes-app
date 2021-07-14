import { CancelToken, del, get, post, put } from './apiClient';
import { NoteAdd, NoteEdit, Note } from 'types';

type NoteEditProps = {
  noteId: string;
  note: NoteEdit;
};

export enum Endpoints {
  notes = '/api/notes',
}

export const getNotes = async (cancelToken: CancelToken) => {
  const { data } = await get<Note[]>(Endpoints.notes, cancelToken);

  return data;
};

export const addNote = async (note: NoteAdd) => {
  const { data } = await post<Note, NoteAdd>(Endpoints.notes, note);

  return data;
};

export const deleteNote = async (noteId: string) => {
  const { data } = await del(`${Endpoints.notes}/${noteId}`);

  return data;
};

export const editNote = async ({ noteId, note }: NoteEditProps) => {
  const { data } = await put<Note, NoteEdit>(`${Endpoints.notes}/${noteId}`, note);

  return data;
};
