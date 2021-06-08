import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testHelpers';
import App from './App';

describe('App component', () => {
  it('renders component correctly', () => {
    renderWithProviders(<App />);

    const linkElement = screen.getByText(/some app/i);
    expect(linkElement).toBeInTheDocument();
  });
});
