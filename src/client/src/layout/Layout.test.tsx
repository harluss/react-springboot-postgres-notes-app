import { APP_TITLE } from 'constants/constants';
import { Paths } from 'types';
import { fireEvent, renderWithProvidersAndRouter, screen } from 'utils/testHelpers';
import Layout from './Layout';

describe('Layout component', () => {
  const DummyChildComponent = () => <div>Dummy child component</div>;

  it('displays app title, sidebar options and child component', () => {
    renderWithProvidersAndRouter({
      component: (
        <Layout>
          <DummyChildComponent />
        </Layout>
      ),
      screenSize: 'md',
    });

    expect(screen.getByText(/dummy child component/i)).toBeInTheDocument();
    expect(screen.getByText(APP_TITLE)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /all notes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add note/i })).toBeInTheDocument();
  });

  it('navigates to correct page on sidebar item click', () => {
    const { history } = renderWithProvidersAndRouter({
      component: (
        <Layout>
          <DummyChildComponent />
        </Layout>
      ),
      screenSize: 'md',
    });

    fireEvent.click(screen.getByRole('button', { name: /add note/i }));
    expect(history.location.pathname).toBe(Paths.addNote);

    fireEvent.click(screen.getByRole('button', { name: /all notes/i }));
    expect(history.location.pathname).toBe(Paths.notes);
  });

  it.skip('handles sidebar on xs and sm screen sizes', async () => {
    renderWithProvidersAndRouter({
      component: (
        <Layout>
          <DummyChildComponent />
        </Layout>
      ),
    });

    expect(screen.getByTestId('sidebar-menu-icon-button')).toBeInTheDocument();
    expect(screen.queryByTestId('sidebar-menu-close-icon-button')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('sidebar-menu-icon-button'));
    // TODO: find different solution or try with Cypress?
    expect(screen.getByTestId('sidebar-menu-close-icon-button')).toBeInTheDocument();
  });
});
