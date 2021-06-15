import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { SortByKeys } from 'types';

type settingsState = {
  isDarkMode: boolean;
  sortBy: SortByKeys;
};

const initialState: settingsState = {
  isDarkMode: true,
  sortBy: 'dateDown',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setSortDate: (state, { payload }: PayloadAction<SortByKeys>) => {
      state.sortBy = payload;
    },
  },
});

export const selectDarkMode = (state: RootState): boolean => state.settings.isDarkMode;
export const selectSortBy = (state: RootState): SortByKeys => state.settings.sortBy;
export const { toggleDarkMode, setSortDate } = settingsSlice.actions;
export default settingsSlice.reducer;
