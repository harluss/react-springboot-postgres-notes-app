import { Paths } from 'types';
import { fireEvent, renderWithProvidersAndRouter, screen, waitFor } from 'utils/testHelpers';
import { NoteCard } from './NoteCard';
import { formatDate } from 'utils/dateFormat';
import { mockNote } from 'mocks/mockData';
import { MemoryHistory } from 'history';

describe('NoteCard component', () => {
  const dummyNote = mockNote();
  let history: MemoryHistory;

  beforeEach(() => {
    const component = renderWithProvidersAndRouter({ component: <NoteCard note={dummyNote} /> });
    history = component.history;
  });

  it('renders component correctly', () => {
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
    expect(screen.getByText(`Note "${dummyNote.title}" will be deleted.`)).toBeInTheDocument();
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
    expect(screen.getByText(`Note "${dummyNote.title}" will be deleted.`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    await waitFor(() => expect(history.location.pathname).toBe(Paths.notes));
  });
});
