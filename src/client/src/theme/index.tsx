import { ReactElement, useEffect, useMemo } from 'react';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectDarkMode, toggleDarkMode } from 'features/settings';

export const GlobalThemeProvider = ({ children }: { children: ReactElement }) => {
  const dispatch = useAppDispatch();
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');
  const isDarkMode = useAppSelector(selectDarkMode);

  useEffect(() => {
    if ((isDarkMode && prefersLightMode) || (!isDarkMode && !prefersLightMode)) {
      dispatch(toggleDarkMode());
    }
  }, [prefersLightMode]);

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkMode ? 'dark' : 'light',
          primary: blue,
        },
        typography: {
          button: {
            fontWeight: 'bold',
          },
          fontFamily: 'Montserrat',
          fontWeightLight: 300,
          fontWeightMedium: 400,
          fontWeightRegular: 500,
          fontWeightBold: 700,
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
