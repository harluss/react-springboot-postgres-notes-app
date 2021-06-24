import axios, { CancelToken } from 'axios';
import { AddNote, EditNote, Note } from 'types';

//export const apiClient = axios.create();

// axios interceptors

type EditNoteProps = {
  noteId: string;
  note: EditNote;
};

export enum Endpoints {
  notes = '/api/notes',
}

export const getNotes = async (cancelToken: CancelToken) => {
  const { data } = await axios.get<Note[]>(Endpoints.notes, { cancelToken });

  return data;
};

export const addNote = async (note: AddNote) => {
  const { data } = await axios.post<Note>(Endpoints.notes, note);

  return data;
};

export const deleteNote = async (noteId: string) => {
  const { data } = await axios.delete(`${Endpoints.notes}/${noteId}`);

  return data;
};

export const editNote = async ({ noteId, note }: EditNoteProps) => {
  const { data } = await axios.put<Note>(`${Endpoints.notes}/${noteId}`, note);

  return data;
};
