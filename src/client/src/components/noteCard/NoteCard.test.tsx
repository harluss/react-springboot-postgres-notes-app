import { screen } from '@testing-library/react';
import { Note } from 'types';
import { renderWithProvidersAndRouter } from 'utils/testHelpers';
import NoteCard from './NoteCard';
import { formatDate } from 'utils/dateFormat';

describe('NoteCard component', () => {
  it('renders component correctly', () => {
    const dummyNote: Note = {
      id: 5,
      title: 'dummyNote',
      details: 'for testing purposes',
      isPinned: false,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
    };

    renderWithProvidersAndRouter(<NoteCard note={dummyNote} />);

    expect(screen.getByText(/dummyNote/i)).toBeInTheDocument();
    expect(screen.getByText(/testing purposes/i)).toBeInTheDocument();
    expect(screen.getByText(formatDate(dummyNote.createdAt))).toBeInTheDocument();
  });

  it.todo('deletes note on delete menu item click');
});
