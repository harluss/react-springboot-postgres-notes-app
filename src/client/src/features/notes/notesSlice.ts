import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AddNote, EditNote, Note } from 'types';
import { apiClientCancelToken, notesAPI } from 'api';

type NotesState = {
  data: Note[];
  status: 'idle' | 'processing' | 'succeeded' | 'failed';
  error: string;
};

const initialState: NotesState = {
  data: [],
  status: 'idle',
  error: '',
};

type EditNoteThunkProps = {
  note: Note;
  toggleIsPinned?: boolean;
};

const abortErrorName = 'AbortError';
const fallbackErrorMessage = (actionString: string) => `Failed to ${actionString}`;

export const fetchNotes = createAsyncThunk('notes/getNotes', async (_: void, { signal }) => {
  const source = apiClientCancelToken.source();

  const cancelReq = () => source.cancel();
  signal.addEventListener('abort', cancelReq);

  const response = await notesAPI.getNotes(source.token);
  signal.removeEventListener('abort', cancelReq);

  return response;
});

export const addNote = createAsyncThunk('notes/addNote', async (note: AddNote) => {
  return notesAPI.addNote(note);
});

export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId: string) => {
  return notesAPI.deleteNote(noteId);
});

export const editNote = createAsyncThunk(
  'notes/editNote',
  async ({ note, toggleIsPinned = false }: EditNoteThunkProps) => {
    const noteToEdit: EditNote = {
      title: note.title,
      details: note.details,
      isPinned: toggleIsPinned ? !note.isPinned : note.isPinned,
    };

    return notesAPI.editNote({ noteId: note.id, note: noteToEdit });
  }
);

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
      state.status = 'succeeded';
    });

    builder.addCase(fetchNotes.rejected, (state, { error }) => {
      state.error = error.message ?? fallbackErrorMessage('fetch notes');

      if (error.name === abortErrorName) {
        state.status = 'idle';
      } else {
        state.status = 'failed';
      }
    });

    builder.addCase(addNote.pending, (state) => {
      state.error = '';
      state.status = 'processing';
    });

    builder.addCase(addNote.fulfilled, (state, { payload }) => {
      state.data.push(payload);
      state.status = 'succeeded';
    });

    builder.addCase(addNote.rejected, (state, { error }) => {
      state.error = error.message ?? fallbackErrorMessage('add note');
      state.status = 'failed';
    });

    builder.addCase(deleteNote.pending, (state) => {
      state.error = '';
      state.status = 'processing';
    });

    builder.addCase(deleteNote.fulfilled, (state, { meta }) => {
      state.data = state.data.filter((note) => note.id !== meta.arg);
      state.status = 'succeeded';
    });

    builder.addCase(deleteNote.rejected, (state, { error }) => {
      state.error = error.message ?? fallbackErrorMessage('delete note');
      state.status = 'failed';
    });

    builder.addCase(editNote.pending, (state) => {
      state.error = '';
      state.status = 'processing';
    });

    builder.addCase(editNote.fulfilled, (state, { payload }) => {
      const index = state.data.findIndex((note) => note.id === payload.id);
      state.data[index] = payload;
      state.status = 'succeeded';
    });

    builder.addCase(editNote.rejected, (state, { error }) => {
      state.error = error.message ?? fallbackErrorMessage('update note');
      state.status = 'failed';
    });
  },
});

export const selectNotesStatus = (state: RootState): string => state.notes.status;
export const selectNotesError = (state: RootState): string | undefined => state.notes.error;
export const selectNotes = (state: RootState): Note[] => state.notes.data;
export const selectNotesState = (state: RootState): NotesState => state.notes;
export default notesSlice.reducer;
