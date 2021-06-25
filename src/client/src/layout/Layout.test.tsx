import { screen } from '@testing-library/react';
import { renderWithProvidersAndRouter } from 'utils/testHelpers';
import Layout from './Layout';

describe('Layout component', () => {
  const DummyChildComponent = () => <div>Dummy child component</div>;

  it('renders component correctly', () => {
    renderWithProvidersAndRouter({
      component: (
        <Layout>
          <DummyChildComponent />
        </Layout>
      ),
      screenSize: 'md',
    });

    expect(screen.getByText(/dummy child component/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /all notes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add note/i })).toBeInTheDocument();
  });

  it.todo('handles sidebar on xs and sm screen sizes');
  it.todo('navigates to correct page');
});
