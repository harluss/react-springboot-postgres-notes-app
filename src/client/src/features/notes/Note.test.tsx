import { fireEvent, screen, waitFor } from '@testing-library/react';
import { generateDummyNote } from 'mocks/mockData';
import { HistoryProps, Paths } from 'types';
import { formatDateTime } from 'utils/dateFormat';
import { renderWithProvidersAndRouter } from 'utils/testHelpers';
import { Note } from './Note';

describe('Note component', () => {
  const dummyNote = generateDummyNote();
  const historyProps: HistoryProps = { path: Paths.viewNote, state: { note: dummyNote } };

  it('renders component correctly and populates the form with note from location state', () => {
    dummyNote.updatedAt = dummyNote.createdAt;
    renderWithProvidersAndRouter({ component: <Note />, historyProps });

    expect(screen.getByText(dummyNote.title)).toBeInTheDocument();
    expect(screen.getByText(dummyNote.details)).toBeInTheDocument();
    expect(screen.getByText(/created/i)).toBeInTheDocument();
    expect(screen.getByText(formatDateTime(dummyNote.createdAt))).toBeInTheDocument();
    expect(screen.queryByText(/last edited/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pin/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('shows error message if no note is passed in location state', () => {
    renderWithProvidersAndRouter({ component: <Note /> });

    expect(screen.getByText(/did you forget to select note/i)).toBeInTheDocument();
  });

  it('redirects to edit page on edit button click', async () => {
    const { history } = renderWithProvidersAndRouter({ component: <Note />, historyProps });

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    expect(history.location.pathname).toBe(Paths.editNote);
    expect(history.location.state).toMatchObject({ note: dummyNote });
  });

  it('opens confirmation alert dialog on delete menu option clicked', () => {
    renderWithProvidersAndRouter({ component: <Note />, historyProps });

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(screen.queryByText(`Note "${dummyNote.title}" will be deleted.`)).toBeInTheDocument();
  });

  it('handles pin/unpin action', async () => {
    dummyNote.isPinned = false;
    renderWithProvidersAndRouter({ component: <Note />, historyProps });

    expect(screen.queryByRole('button', { name: /unpin/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pin/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /pin/i }));
    expect(await screen.findByRole('button', { name: /unpin/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /unpin/i }));
    expect(await screen.findByRole('button', { name: /pin/i })).toBeInTheDocument();
  });

  it('handles delete action on delete confirmation', async () => {
    const { history } = renderWithProvidersAndRouter({ component: <Note />, historyProps });

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(screen.getByText(`Note "${dummyNote.title}" will be deleted.`)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('confirm-button'));
    await waitFor(() =>
      expect(screen.queryByText(`Note "${dummyNote.title}" will be deleted.`)).not.toBeInTheDocument()
    );
    expect(history.location.pathname).toBe(Paths.notes);
  });
});
