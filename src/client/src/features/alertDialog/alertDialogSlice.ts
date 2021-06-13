import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

type alertDialogState = {
  isOpen?: boolean;
  title: string;
  details: string;
  confirmButtonText: string;
  cancelButtonText: string;
};

const initialState: alertDialogState = {
  isOpen: false,
  title: '',
  details: '',
  confirmButtonText: '',
  cancelButtonText: '',
};

type alertDialogPayload = alertDialogState;

export const alertDialogSlice = createSlice({
  name: 'alertDialog',
  initialState,
  reducers: {
    setAlertDialog: (_, { payload }: PayloadAction<alertDialogPayload>) => ({ isOpen: true, ...payload }),
  },
});

export const selectAlertDialog = (state: RootState): alertDialogState => state.alertDialog;
export const { setAlertDialog } = alertDialogSlice.actions;
export default alertDialogSlice.reducer;
