import { Paths } from 'types';
import { fireEvent, renderWithProvidersAndRouter, screen, waitFor } from 'utils/testHelpers';
import { NoteCard } from './NoteCard';
import { formatDate } from 'utils/dateFormat';
import { generateDummyNote } from 'mocks/mockData';

const dummyNote = generateDummyNote();

describe('NoteCard component', () => {
  it('renders component correctly', () => {
    renderWithProvidersAndRouter({ component: <NoteCard note={dummyNote} /> });

    expect(screen.getByText(dummyNote.title)).toBeInTheDocument();
    expect(screen.getByText(dummyNote.details)).toBeInTheDocument();
    expect(screen.getByText(formatDate(dummyNote.createdAt))).toBeInTheDocument();
  });

  it('opens menu on menu icon click', () => {
    renderWithProvidersAndRouter({ component: <NoteCard note={dummyNote} /> });

    expect(screen.queryByText(/delete/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('menu-icon-button'));
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
    expect(screen.getByText(/pin/i)).toBeInTheDocument();
  });

  it('opens confirmation alert dialog on delete menu option click', () => {
    renderWithProvidersAndRouter({ component: <NoteCard note={dummyNote} /> });

    fireEvent.click(screen.getByTestId('menu-icon-button'));
    fireEvent.click(screen.getByText(/delete/i));
    expect(screen.queryByText(`Note "${dummyNote.title}" will be deleted.`)).toBeInTheDocument();
  });

  it('redirects to note component on card body click', () => {
    const { history } = renderWithProvidersAndRouter({ component: <NoteCard note={dummyNote} /> });

    expect(history.location.pathname).toBe(Paths.notes);

    fireEvent.click(screen.getByText(dummyNote.details));
    expect(history.location.pathname).toBe(Paths.viewNote);
    expect(history.location.state).toMatchObject({ note: dummyNote });
  });

  it.skip('handles pin toggle on pin menu option click', async () => {
    renderWithProvidersAndRouter({ component: <NoteCard note={dummyNote} /> });

    fireEvent.click(screen.getByTestId('menu-icon-button'));
    fireEvent.click(screen.getByText(/pin/i));

    await waitFor(() => expect(screen.getByText(/note pinned/i)).toBeInTheDocument());
    expect(screen.queryByText(/edit/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('menu-icon-button'));
    expect(screen.getByText(/unpin/i)).toBeInTheDocument();
    screen.debug();
  });
  it.todo('handles delete on delete menu option click');
});
