import { Note as NoteType, Paths } from 'types';
import { fireEvent, formatDate, renderWithProvidersAndRouter, screen, waitFor } from 'utils';
import { NoteCard } from './NoteCard';
import { MemoryHistory } from 'history';
import { MESSAGE_NOTE_DELETE_WARNING } from 'constants/const';
import { findMockNoteById, getFirstMockNote } from 'mocks';

describe('NoteCard component', () => {
  let dummyNote: NoteType;
  let history: MemoryHistory;

  beforeEach(() => {
    dummyNote = getFirstMockNote();
    const component = renderWithProvidersAndRouter({ component: <NoteCard note={dummyNote} /> });
    history = component.history;
  });

  it('displays title, details and created date', () => {
    expect(screen.getByText(dummyNote.title)).toBeInTheDocument();
    expect(screen.getByText(dummyNote.details)).toBeInTheDocument();
    expect(screen.getByText(formatDate(dummyNote.createdAt))).toBeInTheDocument();
  });

  it('opens menu on menu icon click', () => {
    expect(screen.queryByText(/delete/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('card-menu-icon-button'));
    expect(screen.getByRole('menuitem', { name: /delete/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /pin/i })).toBeInTheDocument();
  });

  it('opens confirmation alert dialog on delete menu option click', () => {
    fireEvent.click(screen.getByTestId('card-menu-icon-button'));
    fireEvent.click(screen.getByRole('menuitem', { name: /delete/i }));
    expect(screen.getByText(MESSAGE_NOTE_DELETE_WARNING(dummyNote.title))).toBeInTheDocument();
  });

  it('redirects to note component on card body click', () => {
    expect(history.location.pathname).toBe(Paths.notes);

    fireEvent.click(screen.getByText(dummyNote.details));
    expect(history.location.pathname).toBe(Paths.viewNote);
    expect(history.location.state).toMatchObject({ note: dummyNote });
  });

  it('handles pin toggle on pin menu option click', async () => {
    if (dummyNote.isPinned) {
      fireEvent.click(screen.getByTestId('card-menu-icon-button'));
      fireEvent.click(screen.getByRole('menuitem', { name: /unpin/i }));
      await waitFor(() => expect(screen.queryByRole('menuitem', { name: /unpin/i })).not.toBeInTheDocument());
      expect(findMockNoteById(dummyNote.id)?.isPinned).toEqual(false);
    } else {
      fireEvent.click(screen.getByTestId('card-menu-icon-button'));
      fireEvent.click(screen.getByRole('menuitem', { name: /^pin/i }));
      await waitFor(() => expect(screen.queryByRole('menuitem', { name: /^pin/i })).not.toBeInTheDocument());
      expect(findMockNoteById(dummyNote.id)?.isPinned).toEqual(true);
    }
  });

  it('handles delete on delete menu option click', async () => {
    fireEvent.click(screen.getByTestId('card-menu-icon-button'));
    fireEvent.click(screen.getByRole('menuitem', { name: /delete/i }));
    expect(screen.getByText(MESSAGE_NOTE_DELETE_WARNING(dummyNote.title))).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    await waitFor(() => expect(history.location.pathname).toBe(Paths.notes));
  });
});
