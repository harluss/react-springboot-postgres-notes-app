import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { notesReducer } from 'features/notes';
import { snackbarReducer } from 'features/snackbar';
import { alertDialogReducer } from 'features/alertDialog';

export const store = configureStore({
  reducer: {
    alertDialog: alertDialogReducer,
    notes: notesReducer,
    snackbar: snackbarReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
