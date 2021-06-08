import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Note } from 'types';
import * as notesAPI from 'api/notesAPI';

type NotesState = {
  data: Note[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

const initialState: NotesState = {
  data: [],
  status: 'idle',
  error: '',
};

// TODO: cancel axios request on canceled thunk
// TODO: handle rejected thunk message
// TODO: write tests
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
      state.data = payload;
      state.status = 'idle';
    });

    builder.addCase(fetchNotes.rejected, (state, { error }) => {
      state.error = error.message;
      state.status = 'failed';
    });
  },
});

export const selectAllNotes = (state: RootState): Note[] => state.notes.data;
export default notesSlice.reducer;
