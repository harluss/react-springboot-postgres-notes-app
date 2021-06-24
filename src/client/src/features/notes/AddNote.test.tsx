import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Paths } from 'types';
import { renderWithProvidersAndRouter } from 'utils/testHelpers';
import { AddNote } from './AddNote';

describe('AddNote component', () => {
  it('renders component correctly', () => {
    renderWithProvidersAndRouter(<AddNote />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/details/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pin note/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveFocus();
  });

  it('shows req validation messages on empty form submission', async () => {
    renderWithProvidersAndRouter(<AddNote />);

    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    await waitFor(() => expect(screen.getByText(/title is a required field/i)).toBeInTheDocument());
    expect(screen.getByText(/details is a required field/i)).toBeInTheDocument();
  });

  it('redirects to notes page on cancel button click', async () => {
    const { history } = renderWithProvidersAndRouter(<AddNote />);

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(history.location.pathname).toBe(Paths.notes);
  });

  it.skip('shows alert prompt on an attempt to navigate away from already filled form', async () => {
    renderWithProvidersAndRouter(<AddNote />);

    userEvent.type(screen.getByLabelText(/title/i), 'some title');
    userEvent.type(screen.getByLabelText(/details/i), 'some details');
    expect(screen.getByLabelText(/title/i)).toHaveValue('some title');
    expect(screen.getByLabelText(/details/i)).toHaveValue('some details');

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    // TODO: fix or find different solution
    await waitFor(() => expect(screen.getByText(/unsaved changes/i)).toBeInTheDocument());
  });
});
