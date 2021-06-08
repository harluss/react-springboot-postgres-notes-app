import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Note } from 'types';
import * as notesAPI from 'api/notesAPI';

type NotesState = {
  notes: Note[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

const initialState: NotesState = {
  notes: [],
  status: 'idle',
  error: '',
};

export const fetchNotes = createAsyncThunk('notes/getNotes', async () => {
  return notesAPI.getNotes();
});

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.error = '';
      state.status = 'loading';
    });

    builder.addCase(fetchNotes.fulfilled, (state, { payload }) => {
      state.notes = payload;
      state.status = 'idle';
    });

    builder.addCase(fetchNotes.rejected, (state, { error }) => {
      state.error = error.message;
      state.status = 'failed';
    });
  },
});

export const selectAllNotes = (state: RootState): Note[] => state.notes.notes;
export default notesSlice.reducer;
