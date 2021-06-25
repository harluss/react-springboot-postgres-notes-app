import { screen } from '@testing-library/react';
import { HistoryProps, Note, Paths } from 'types';
import { renderWithProvidersAndRouter } from 'utils/testHelpers';
import { EditNote } from './EditNote';

describe('EditNote component', () => {
  const dummyNote: Note = {
    id: 'dummyId5',
    title: 'dummyNote',
    details: 'for testing purposes',
    isPinned: false,
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
  };

  it('renders component correctly and populates the form with note from location state', () => {
    const historyProps: HistoryProps = { path: Paths.editNote, state: { note: dummyNote } };

    renderWithProvidersAndRouter({ component: <EditNote />, historyProps });

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/details/i)).toBeInTheDocument();
    expect(screen.getByText(/created/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pin note/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toHaveFocus();

    expect(screen.getByLabelText(/title/i)).toHaveValue(dummyNote.title);
    expect(screen.getByLabelText(/details/i)).toHaveValue(dummyNote.details);
  });

  it('shows error message if no note is passed in location state', () => {
    renderWithProvidersAndRouter({ component: <EditNote /> });

    expect(screen.getByText(/did you forget to select note/i)).toBeInTheDocument();
  });

  it.todo('shows alert prompt on an attempt to navigate away from already filled form');
  it.todo('handles pin checkbox click');
  it.todo('handles submit action');
  it.todo('shows progress indicator after submit');
});
