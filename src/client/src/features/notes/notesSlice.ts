import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AddNote, Note } from 'types';
import * as notesAPI from 'api/notesAPI';
import axios from 'axios';

type NotesState = {
  data: Note[];
  status: 'idle' | 'processing' | 'succeeded' | 'failed';
  error: string | undefined;
};

const initialState: NotesState = {
  data: [],
  status: 'idle',
  error: '',
};

// TODO: handle rejected thunk message
// TODO: write tests

export const fetchNotes = createAsyncThunk('notes/getNotes', async (_: void, { signal }) => {
  const source = axios.CancelToken.source();

  const cancelReq = () => source.cancel();
  signal.addEventListener('abort', cancelReq);

  const response = await notesAPI.getNotes(source.token);
  signal.removeEventListener('abort', cancelReq);

  return response;
});

export const addNote = createAsyncThunk('notes/addNote', async (note: AddNote) => {
  return notesAPI.addNote(note);
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId: number) => {
  return notesAPI.deleteNote(noteId);
});

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.error = '';
      state.status = 'processing';
    });

    builder.addCase(fetchNotes.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = 'idle';
    });

    builder.addCase(fetchNotes.rejected, (state, { error }) => {
      state.error = error.message;
      state.status = 'failed';
    });

    builder.addCase(addNote.pending, (state) => {
      state.error = '';
      state.status = 'processing';
    });

    builder.addCase(addNote.fulfilled, (state, { payload }) => {
      state.data.push(payload);
      state.status = 'idle';
    });

    builder.addCase(addNote.rejected, (state, { error }) => {
      state.error = error.message;
      state.status = 'failed';
    });

    builder.addCase(deleteNote.pending, (state) => {
      state.error = '';
      state.status = 'processing';
    });

    builder.addCase(deleteNote.fulfilled, (state, { meta }) => {
      state.data = state.data.filter((note) => note.id !== meta.arg);
      state.status = 'idle';
    });

    builder.addCase(deleteNote.rejected, (state, { error }) => {
      state.error = error.message;
      state.status = 'failed';
    });
  },
});

export const selectNotesStatus = (state: RootState): string => state.notes.status;
export const selectAllNotes = (state: RootState): Note[] => state.notes.data;
export default notesSlice.reducer;
