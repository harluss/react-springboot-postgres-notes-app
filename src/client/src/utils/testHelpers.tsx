import { render } from '@testing-library/react';
import { store } from 'app/store';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export const renderWithProviders = (component: ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};

export const renderWithProvidersAndRouter = (component: ReactElement) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{component}</Router>
      </Provider>
    ),
    history,
  };
};
