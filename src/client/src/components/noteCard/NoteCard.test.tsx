import { fireEvent, screen } from '@testing-library/react';
import { Note, Paths } from 'types';
import { renderWithProvidersAndRouter } from 'utils/testHelpers';
import { NoteCard } from './NoteCard';
import { formatDate } from 'utils/dateFormat';

describe('NoteCard component', () => {
  const dummyNote: Note = {
    id: 'dummyId5',
    title: 'dummyNote',
    details: 'for testing purposes',
    isPinned: false,
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  };

  it('renders component correctly', () => {
    renderWithProvidersAndRouter({ component: <NoteCard note={dummyNote} /> });

    expect(screen.getByText(/dummyNote/i)).toBeInTheDocument();
    expect(screen.getByText(/testing purposes/i)).toBeInTheDocument();
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

  it('opens confirmation alert dialog on delete menu option clicked', () => {
    renderWithProvidersAndRouter({ component: <NoteCard note={dummyNote} /> });

    fireEvent.click(screen.getByTestId('menu-icon-button'));
    fireEvent.click(screen.getByText(/delete/i));
    expect(screen.queryByText(/note "dummynote" will be deleted/i)).toBeInTheDocument();
  });

  it('redirects to note component on card body click', () => {
    const { history } = renderWithProvidersAndRouter({ component: <NoteCard note={dummyNote} /> });

    expect(history.location.pathname).toBe(Paths.notes);

    fireEvent.click(screen.getByRole('button', { name: /dummynote/i }));
    expect(history.location.pathname).toBe(Paths.viewNote);
    expect(history.location.state).toMatchObject({ note: dummyNote });
  });

  it.todo('handles delete action');
  it.todo('handles toggle pin action');
});
