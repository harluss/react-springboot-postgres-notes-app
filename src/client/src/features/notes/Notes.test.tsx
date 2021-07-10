import { Endpoints } from 'api/notesAPI';
import { mockData } from 'mocks/mockData';
import { rest, server } from 'mocks/mockServer';
import { renderWithProvidersAndRouter, screen } from 'utils/testHelpers';
import { Notes } from './Notes';

describe('Notes component', () => {
  it('renders component correctly and loads notes', async () => {
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
    expect(await screen.findByText(/you have no saved notes/i)).toBeInTheDocument();
  });

  it('displays generic error message on unsuccessful response', async () => {
    server.use(
      rest.get(`${Endpoints.notes}`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    renderWithProvidersAndRouter({ component: <Notes /> });

    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
    expect(await screen.findByText(/oops! something went wrong/i)).toBeInTheDocument();
  });
});
