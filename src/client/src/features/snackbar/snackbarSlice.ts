import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

type SnackbarType = 'error' | 'info' | 'success' | 'warning';

type SnackbarState = {
  isOpen: boolean;
  type: SnackbarType;
  message: string;
};

type SnackbarPayload = {
  type: SnackbarType;
  message: string;
};

const initialState: SnackbarState = {
  isOpen: false,
  type: 'info',
  message: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar: (_, { payload }: PayloadAction<SnackbarPayload>) => ({ ...payload, isOpen: true }),
    closeSnackbar: (state) => ({ ...state, isOpen: false }),
  },
});

export const selectSnackbar = (state: RootState): SnackbarState => state.snackbar;
export const { setSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
