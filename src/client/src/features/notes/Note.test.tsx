import { fireEvent, screen } from '@testing-library/react';
import { HistoryProps, Note as NoteType, Paths } from 'types';
import { formatDateTime } from 'utils/dateFormat';
import { renderWithProvidersAndRouter } from 'utils/testHelpers';
import { Note } from './Note';

describe('Note component', () => {
  const dummyNote: NoteType = {
    id: 'dummyId5',
    title: 'dummyNote',
    details: 'for testing purposes',
    isPinned: false,
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  };

  const historyProps: HistoryProps = { path: Paths.viewNote, state: { note: dummyNote } };

  it('renders component correctly and populates the form with note from location state', () => {
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
    expect(screen.queryByText(/note "dummynote" will be deleted/i)).toBeInTheDocument();
  });

  it.todo('handles pin/unpin action');
  it.todo('handles delete action on delete confirmation');
});
