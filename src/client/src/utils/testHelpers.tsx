import { render } from '@testing-library/react';
import { rootReducer } from 'app/store';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { HistoryProps } from 'types';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { configureStore } from '@reduxjs/toolkit';

type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type RenderWithProvidersAndRouterProps = {
  component: ReactElement;
  historyProps?: HistoryProps;
  screenSize?: ScreenSize;
};

type ScreenSizeWrapperProps = {
  children?: ReactNode;
  size?: ScreenSize;
};

const screenSizeWrapper = ({ children, size }: ScreenSizeWrapperProps) => {
  const theme = createMuiTheme({ props: { MuiWithWidth: { initialWidth: size } } });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export * from '@testing-library/react';

export const renderWithProvidersAndRouter = ({
  component,
  historyProps = undefined,
  screenSize = undefined,
}: RenderWithProvidersAndRouterProps) => {
  const history = createMemoryHistory();
  const store = configureStore({ reducer: rootReducer });

  if (historyProps) {
    const { path, state } = historyProps;
    history.push(path, state);
  }

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{component}</Router>
      </Provider>,
      { wrapper: ({ children }) => screenSizeWrapper({ children, size: screenSize }) }
    ),
    history,
  };
};

export const renderWithProviders = (component: ReactElement) => {
  const history = createMemoryHistory();
  const store = configureStore({ reducer: rootReducer });

  return { ...render(<Provider store={store}>{component}</Provider>), history };
};
