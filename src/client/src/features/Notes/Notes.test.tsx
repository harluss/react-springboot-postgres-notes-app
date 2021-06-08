import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testHelpers';
import Notes from './Notes';

describe('Notes component', () => {
  it('renders component correctly', () => {
    renderWithProviders(<Notes />);
    const linkElement = screen.getByText(/notes/i);
    expect(linkElement).toBeInTheDocument();
  });
});
