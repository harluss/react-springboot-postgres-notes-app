import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

type snackbarState = {
  isOpen: boolean;
  type: 'error' | 'info' | 'success' | 'warning';
  message: string;
};

type snackbarPayload = snackbarState;

const initialState: snackbarState = {
  isOpen: false,
  type: 'info',
  message: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar: (state, { payload }: PayloadAction<snackbarPayload>) => ({ ...state, ...payload }),
  },
});

export const selectSnackbar = (state: RootState): snackbarState => state.snackbar;
export const { setSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
