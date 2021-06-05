import axios from 'axios';
import { Note } from 'types';

export const getNotes = async (): Promise<Note[]> => {
  const { data } = await axios.get<Note[]>('/api/notes');

  return data;
};
