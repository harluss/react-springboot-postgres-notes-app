import userEvent from '@testing-library/user-event';
import { mockData } from 'mocks/mockData';
import { Note, NoteInputs } from 'types';
import { formatDateTime } from 'utils/dateFormat';
import { fireEvent, renderWithProvidersAndRouter, screen } from 'utils/testHelpers';
import App from './App';

describe('App component', () => {
  let mockedNotes: Note[];

  beforeEach(() => {
    renderWithProvidersAndRouter({
      component: <App />,
      screenSize: 'md',
    });
    mockedNotes = mockData.note.getAll();
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
    // expect(await screen.findByTestId('progress-indicator')).toBeInTheDocument();
    expect(await screen.findByText(/note added/i)).toBeInTheDocument();
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
      expect(screen.queryByText(/last edited/i)).not.toBeInTheDocument();
    } else {
      expect(screen.getByText(/last edited/i)).toBeInTheDocument();
    }

    if (someNote.isPinned) {
      expect(screen.getByRole('button', { name: /unpin/i })).toBeInTheDocument();
    } else {
      expect(screen.queryByRole('button', { name: /unpin/i })).not.toBeInTheDocument();
    }
  });

  it.todo('handles delete note');
  it.todo('handles sortBy change');
});
