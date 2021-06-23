import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

type SnackbarState = {
  isOpen: boolean;
  type: 'error' | 'info' | 'success' | 'warning';
  message: string;
};

type SnackbarPayload = SnackbarState;

const initialState: SnackbarState = {
  isOpen: false,
  type: 'info',
  message: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar: (state, { payload }: PayloadAction<SnackbarPayload>) => ({ ...state, ...payload }),
  },
});

export const selectSnackbar = (state: RootState): SnackbarState => state.snackbar;
export const { setSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
