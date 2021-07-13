import { Paths } from 'types';
import { fireEvent, formatDate, renderWithProvidersAndRouter, screen, waitFor } from 'utils';
import { NoteCard } from './NoteCard';
import { mockNote } from 'mocks';
import { MemoryHistory } from 'history';
import { MESSAGE_NOTE_DELETE_WARNING } from 'constants/const';

describe('NoteCard component', () => {
  const dummyNote = mockNote();
  let history: MemoryHistory;

  beforeEach(() => {
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

  it.skip('handles pin toggle on pin menu option click', async () => {
    dummyNote.isPinned = false;

    expect(screen.queryByRole('menuitem', { name: /pin/i })).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('card-menu-icon-button'));
    fireEvent.click(screen.getByRole('menuitem', { name: /^pin/i }));
    await waitFor(() => expect(screen.queryByRole('menuitem', { name: /^pin/i })).not.toBeInTheDocument());

    fireEvent.click(screen.getByTestId('card-menu-icon-button'));
    expect(screen.getByRole('menuitem', { name: /unpin/i })).toBeInTheDocument();
  });

  it('handles delete on delete menu option click', async () => {
    fireEvent.click(screen.getByTestId('card-menu-icon-button'));
    fireEvent.click(screen.getByRole('menuitem', { name: /delete/i }));
    expect(screen.getByText(MESSAGE_NOTE_DELETE_WARNING(dummyNote.title))).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    await waitFor(() => expect(history.location.pathname).toBe(Paths.notes));
  });
});
