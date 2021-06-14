import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

type settingsState = {
  isDarkMode: boolean;
  sortBy: 'dateDescending' | 'dateAscending';
};

// TODO: extract sortBy type to types folder and share with Notes
// TODO: add check for darkMode system settings
// TODO: add setSort action
// TODO: add save settings to local storage (temp, until user profile logic is added)

const initialState: settingsState = {
  isDarkMode: true,
  sortBy: 'dateDescending',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const selectIsDarkMode = (state: RootState): boolean => state.settings.isDarkMode;
export const { toggleDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;
