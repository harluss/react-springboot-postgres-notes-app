import { render } from '@testing-library/react';
import { store } from 'app/store';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { HistoryProps } from 'types';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

export const renderWithProviders = (component: ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type RenderWithProvidersAndRouterProps = {
  component: ReactElement;
  historyProps?: HistoryProps;
  screenSize?: ScreenSize;
};

export const renderWithProvidersAndRouter = ({
  component,
  historyProps = undefined,
  screenSize = undefined,
}: RenderWithProvidersAndRouterProps) => {
  const history = createMemoryHistory();

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

type ScreenSizeWrapperProps = {
  children?: ReactNode;
  size?: ScreenSize;
};

const screenSizeWrapper = ({ children, size }: ScreenSizeWrapperProps) => {
  const theme = createMuiTheme({ props: { MuiWithWidth: { initialWidth: size } } });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
