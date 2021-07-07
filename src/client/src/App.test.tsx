import { renderWithProviders } from 'utils/testHelpers';
import App from './App';

describe('App component', () => {
  it('renders component correctly', () => {
    renderWithProviders(<App />);
  });
});
