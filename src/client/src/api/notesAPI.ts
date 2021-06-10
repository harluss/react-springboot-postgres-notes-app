import axios, { CancelToken } from 'axios';
import { AddNote, Note } from 'types';

//export const apiClient = axios.create();

// axios interceptors

export const getNotes = async (cancelToken: CancelToken) => {
  const { data } = await axios.get<Note[]>('/api/notes', { cancelToken });

  return data;
};

export const addNote = async (note: AddNote) => {
  const { data } = await axios.post<Note>('/api/notes', note);

  return data;
};

export const deleteNote = async (noteId: number) => {
  const { data } = await axios.delete(`/api/notes/${noteId}`);

  return data;
};
