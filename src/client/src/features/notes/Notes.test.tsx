import { Endpoints } from 'api/notesAPI';
import { MESSAGE_GENERIC_ERROR, MESSAGE_NO_NOTES_SAVED } from 'constants/constants';
import { mockData } from 'mocks/mockData';
import { rest, server } from 'mocks/mockServer';
import { renderWithProvidersAndRouter, screen } from 'utils/testHelpers';
import { Notes } from './Notes';

describe('Notes component', () => {
  it('show progress indicator while loading notes then displays notes', async () => {
    renderWithProvidersAndRouter({ component: <Notes /> });
    const mockedNotes = mockData.note.getAll();

    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
    expect(await screen.findAllByTestId('card-menu-icon-button')).toHaveLength(mockedNotes.length);
  });

  it('displays message if no notes saved', async () => {
    server.use(
      rest.get(`${Endpoints.notes}`, (_, res, ctx) => {
        return res.once(ctx.status(200), ctx.json([]));
      })
    );
    renderWithProvidersAndRouter({ component: <Notes /> });

    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
    expect(await screen.findByText(MESSAGE_NO_NOTES_SAVED)).toBeInTheDocument();
  });

  it('displays generic error message on unsuccessful response', async () => {
    server.use(
      rest.get(`${Endpoints.notes}`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    renderWithProvidersAndRouter({ component: <Notes /> });

    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
    expect(await screen.findByText(MESSAGE_GENERIC_ERROR)).toBeInTheDocument();
  });
});
