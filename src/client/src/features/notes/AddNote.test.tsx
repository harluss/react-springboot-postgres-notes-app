import userEvent from '@testing-library/user-event';
import { Paths } from 'types';
import { fireEvent, renderWithProvidersAndRouter, screen, waitFor } from 'utils/testHelpers';
import { AddNote } from './AddNote';
import { MemoryHistory } from 'history';

describe('AddNote component', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    const component = renderWithProvidersAndRouter({ component: <AddNote /> });
    history = component.history;
  });

  it('renders component correctly', () => {
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/details/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pin note/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveFocus();
  });

  it('shows required validation messages', async () => {
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(await screen.findByText(/title is a required field/i)).toBeInTheDocument();
    expect(screen.getByText(/details is a required field/i)).toBeInTheDocument();

    userEvent.type(screen.getByLabelText(/title/i), 'some title');
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(await screen.findByText(/details is a required field/i)).toBeInTheDocument();
    expect(screen.queryByText(/title is a required field/i)).not.toBeInTheDocument();
  });

  it('redirects to notes page on cancel button click', async () => {
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(history.location.pathname).toBe(Paths.notes);
  });

  it.skip('shows alert prompt on an attempt to navigate away from already filled form', async () => {
    userEvent.type(screen.getByLabelText(/title/i), 'some title');
    userEvent.type(screen.getByLabelText(/details/i), 'some details');
    expect(screen.getByLabelText(/title/i)).toHaveValue('some title');
    expect(screen.getByLabelText(/details/i)).toHaveValue('some details');

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    // TODO: fix or find different solution or test with Cypress?
    // expect(await screen.findByText(/unsaved changes/i)).toBeInTheDocument();
  });

  it('handles submit action', async () => {
    userEvent.type(screen.getByLabelText(/title/i), 'some title');
    userEvent.type(screen.getByLabelText(/details/i), 'some details');
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    // expect(await screen.findByTestId('progress-indicator')).toBeInTheDocument();
    await waitFor(() => expect(history.location.pathname).toBe(Paths.notes));
  });
});
