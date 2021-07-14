import userEvent from '@testing-library/user-event';
import { MESSAGE_NO_NOTE_SELECTED } from 'constants/const';
import { MemoryHistory } from 'history';
import { getFirstMockNote } from 'mocks';
import { Note as NoteType, HistoryProps, Paths } from 'types';
import { fireEvent, renderWithProvidersAndRouter, screen, waitFor } from 'utils';
import { EditNote } from './EditNote';

describe('EditNote component', () => {
  let dummyNote: NoteType;
  let history: MemoryHistory;

  beforeEach(() => {
    dummyNote = getFirstMockNote();
    const historyProps: HistoryProps = { path: Paths.viewNote, state: { note: dummyNote } };
    const component = renderWithProvidersAndRouter({ component: <EditNote />, historyProps });
    history = component.history;
  });

  it('renders and populates form with note from location state', () => {
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

    expect(screen.getByText(MESSAGE_NO_NOTE_SELECTED)).toBeInTheDocument();
  });

  it('handles submit action', async () => {
    userEvent.type(screen.getByLabelText(/title/i), 'edited title');
    userEvent.type(screen.getByLabelText(/details/i), 'edited details');
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(await screen.findByTestId('progress-indicator')).toBeInTheDocument();
    await waitFor(() => expect(history.location.pathname).toBe(Paths.notes));
  });

  it('has save button disabled until changes to the note content are made', () => {
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled;

    userEvent.type(screen.getByLabelText(/title/i), 'edited title');
    expect(screen.getByRole('button', { name: /save/i })).not.toBeDisabled();
  });

  it.todo('shows alert prompt on an attempt to navigate away when changes made');
});
