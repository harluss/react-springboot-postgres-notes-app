import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Paths } from 'types';
import { renderWithProvidersAndRouter } from 'utils/testHelpers';
import { AddNote } from './AddNote';

describe('AddNote component', () => {
  it('renders component correctly', () => {
    renderWithProvidersAndRouter({ component: <AddNote /> });

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/details/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pin note/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveFocus();
  });

  it('shows required validation messages', async () => {
    renderWithProvidersAndRouter({ component: <AddNote /> });

    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    await waitFor(() => expect(screen.getByText(/title is a required field/i)).toBeInTheDocument());
    expect(screen.getByText(/details is a required field/i)).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/title/i), 'some title');
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    await waitFor(() => expect(screen.getByText(/details is a required field/i)).toBeInTheDocument());
    expect(screen.queryByText(/title is a required field/i)).not.toBeInTheDocument();
  });

  it('redirects to notes page on cancel button click', async () => {
    const { history } = renderWithProvidersAndRouter({ component: <AddNote /> });

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(history.location.pathname).toBe(Paths.notes);
  });

  it.skip('shows alert prompt on an attempt to navigate away from already filled form', async () => {
    renderWithProvidersAndRouter({ component: <AddNote /> });

    userEvent.type(screen.getByLabelText(/title/i), 'some title');
    userEvent.type(screen.getByLabelText(/details/i), 'some details');
    expect(screen.getByLabelText(/title/i)).toHaveValue('some title');
    expect(screen.getByLabelText(/details/i)).toHaveValue('some details');

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    // TODO: fix or find different solution
    await waitFor(() => expect(screen.getByText(/unsaved changes/i)).toBeInTheDocument());
  });

  it('handles submit action', async () => {
    const { history } = renderWithProvidersAndRouter({ component: <AddNote /> });

    userEvent.type(screen.getByLabelText(/title/i), 'some title');
    userEvent.type(screen.getByLabelText(/details/i), 'some details');
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    await waitFor(() => expect(screen.getByTestId('progress-indicator')).toBeInTheDocument());
    expect(history.location.pathname).toBe(Paths.notes);
  });
});
