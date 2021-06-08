import { render } from '@testing-library/react';
import { store } from 'app/store';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';

export const renderWithProviders = (component: ReactElement) => {
  render(<Provider store={store}>{component}</Provider>);
};
