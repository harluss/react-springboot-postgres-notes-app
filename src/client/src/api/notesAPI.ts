import axios from 'axios';
import { Note } from 'types';

//export const apiClient = axios.create();
//const cancelToken = axios.CancelToken.source();

// axios interceptors

export const getNotes = async () => {
  const { data } = await axios.get<Note[]>('/api/notes');

  return data;
};
