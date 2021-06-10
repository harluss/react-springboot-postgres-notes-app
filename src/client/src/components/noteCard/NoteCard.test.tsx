import { screen } from '@testing-library/react';
import { Note } from 'types';
import { renderWithProviders } from 'utils/testHelpers';
import NoteCard from './NoteCard';

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

    renderWithProviders(<NoteCard note={dummyNote} />);

    const title = screen.getByText(/dummyNote/i);
    const details = screen.getByText(/testing purposes/i);
    const createdAt = screen.getByText(dummyNote.createdAt);
    expect(title).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(createdAt).toBeInTheDocument();
  });

  it.todo('deletes note on delete menu item click');
});
