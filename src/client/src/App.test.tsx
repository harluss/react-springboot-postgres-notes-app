import userEvent from '@testing-library/user-event';
import { fireEvent, formatDateTime, renderWithProvidersAndRouter, screen } from 'utils';
import { MESSAGE_ROUTE_404, SNACKBAR_NOTE_ADD_SUCCESS, SNACKBAR_NOTE_DELETE_SUCCESS } from 'constants/const';
import { getAllMockedNotes } from 'mocks';
import { HistoryProps, Note, NoteInputs } from 'types';
import App from './App';

describe('App component', () => {
  let mockedNotes: Note[];

  beforeEach(() => {
    renderWithProvidersAndRouter({
      component: <App />,
      screenSize: 'md',
    });
    mockedNotes = getAllMockedNotes();
  });

  it('handles add note', async () => {
    const newNote: NoteInputs = {
      title: 'some title',
      details: 'some details',
      isPinned: false,
    };

    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
    expect(await screen.findAllByTestId('card-menu-icon-button')).toHaveLength(mockedNotes.length);
    expect(screen.queryByText(newNote.title)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /add note/i }));
    userEvent.type(screen.getByLabelText(/title/i), newNote.title);
    userEvent.type(screen.getByLabelText(/details/i), newNote.details);
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(await screen.findByText(SNACKBAR_NOTE_ADD_SUCCESS)).toBeInTheDocument();
    expect(await screen.findAllByTestId('card-menu-icon-button')).toHaveLength(mockedNotes.length + 1);
    expect(screen.getByText(newNote.title)).toBeInTheDocument();
  });

  it('handles note card click', async () => {
    const someNote = mockedNotes[0];

    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
    expect(await screen.findAllByTestId('card-menu-icon-button')).toHaveLength(mockedNotes.length);

    fireEvent.click(screen.getByText(someNote.details));
    expect(screen.queryByTestId('card-menu-icon-button')).not.toBeInTheDocument();
    expect(screen.getByText(someNote.title)).toBeInTheDocument();
    expect(screen.getByText(someNote.details)).toBeInTheDocument();
    expect(screen.getByText(formatDateTime(someNote.createdAt))).toBeInTheDocument();

    if (someNote.updatedAt === someNote.createdAt) {
      expect(screen.queryByText(/last updated/i)).not.toBeInTheDocument();
    } else {
      expect(screen.getByText(/last updated/i)).toBeInTheDocument();
    }

    if (someNote.isPinned) {
      expect(screen.getByRole('button', { name: /unpin/i })).toBeInTheDocument();
    } else {
      expect(screen.queryByRole('button', { name: /unpin/i })).not.toBeInTheDocument();
    }
  });

  it('handles delete note', async () => {
    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
    const cardMenuButtons = await screen.findAllByTestId('card-menu-icon-button');
    expect(cardMenuButtons).toHaveLength(mockedNotes.length);

    fireEvent.click(cardMenuButtons[0]);
    fireEvent.click(screen.getByRole('menuitem', { name: /delete/i }));
    expect(screen.getByText(/will be deleted.$/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(await screen.findByText(SNACKBAR_NOTE_DELETE_SUCCESS)).toBeInTheDocument();
    expect(await screen.findAllByTestId('card-menu-icon-button')).toHaveLength(mockedNotes.length - 1);
  });

  it('shows 404 message on an attempt to navigate to non-existing route', () => {
    const dummyRoute: HistoryProps = { path: '/dummyPath', state: {} };
    renderWithProvidersAndRouter({
      component: <App />,
      historyProps: dummyRoute,
    });

    expect(screen.getByText(MESSAGE_ROUTE_404)).toBeInTheDocument();
  });

  it.todo('handles sortBy change');
});
