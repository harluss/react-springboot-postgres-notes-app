import { screen, waitFor } from '@testing-library/react';
import { Endpoints } from 'api/notesAPI';
import { mockData } from 'mocks/mockData';
import { rest, server } from 'mocks/mockServer';
import { renderWithProvidersAndRouter } from 'utils/testHelpers';
import { Notes } from './Notes';
// import { store } from 'app/store';
// import { reset } from 'features/notes/notesSlice';

describe('Notes component', () => {
  it('displays message if no notes saved', async () => {
    server.use(
      rest.get(`${Endpoints.notes}`, (_, res, ctx) => {
        console.log('#######');
        // return res.once(ctx.status(200), ctx.json([]));
        return res(ctx.status(500));
      })
    );
    renderWithProvidersAndRouter({ component: <Notes /> });
  });

  it('renders component correctly and loads notes', async () => {
    renderWithProvidersAndRouter({ component: <Notes /> });
    const mockedNotes = mockData.note.getAll();

    expect(screen.getByTestId('progress-indicator')).toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByTestId('menu-icon-button')).toHaveLength(mockedNotes.length));
  });

  // it('displays message if no notes saved', async () => {
  //   server.use(
  //     rest.get(`${Endpoints.notes}`, (_, res, ctx) => {
  //       console.log('#######');
  //       // return res.once(ctx.status(200), ctx.json([]));
  //       return res(ctx.status(500));
  //     })
  //   );
  //   renderWithProvidersAndRouter({ component: <Notes /> });
  // });
});
