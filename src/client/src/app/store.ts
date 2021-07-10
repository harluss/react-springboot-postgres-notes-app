import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { notesReducer } from 'features/notes';
import { snackbarReducer } from 'features/snackbar';
import { settingsReducer } from 'features/settings';

export const rootReducer = combineReducers({
  notes: notesReducer,
  settings: settingsReducer,
  snackbar: snackbarReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
