// import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testHelpers';
import AddNote from './AddNote';

describe('AddNote component', () => {
  it('renders component correctly', () => {
    renderWithProviders(<AddNote />);

    // const linkElement = screen.getByText(/notes/i);
    // expect(linkElement).toBeInTheDocument();
  });
});
