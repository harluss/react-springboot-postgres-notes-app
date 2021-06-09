// import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testHelpers';
import AddNote from './AddNote';

describe('AddNote component', () => {
  it('renders component correctly', () => {
    renderWithProviders(<AddNote />);

    // expect(screen.getByLabelText(/title/i)).toBeInTheDocument;
    // expect(screen.getByLabelText(/details/i)).toBeInTheDocument;
    // expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument;
  });
});
