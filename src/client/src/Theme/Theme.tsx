import { ReactElement, useMemo } from 'react';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { useAppSelector } from 'app/hooks';
import { selectDarkMode } from 'features/settings';

const GlobalThemeProvider = ({ children }: { children: ReactElement }) => {
  const isDarkMode = useAppSelector(selectDarkMode);

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

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default GlobalThemeProvider;
