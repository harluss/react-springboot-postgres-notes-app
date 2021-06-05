import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Note } from 'types';
import { getNotes } from 'api/notesAPI';

type NotesState = {
  notes: Note[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string;
};

const initialState: NotesState = {
  notes: [],
  status: 'idle',
  error: '',
};

export const fetchNotes = createAsyncThunk('notes/getNotes', async (_, { rejectWithValue }) => {
  try {
    return getNotes();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.status = 'loading';
      state.error = '';
    });

    builder.addCase(fetchNotes.fulfilled, (state, { payload }) => {
      state.notes = payload;
      state.status = 'succeeded';
    });

    builder.addCase(fetchNotes.rejected, (state, { error }) => {
      // if (payload) state.error = payload.errorMessage;
      state.error = error as string;
      state.status = 'failed';
    });
  },
});

export const selectNotes = (state: RootState): Note[] => state.notes.notes;
export default notesSlice.reducer;
