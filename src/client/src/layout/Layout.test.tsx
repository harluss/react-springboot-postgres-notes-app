import { screen } from '@testing-library/react';
import { renderWithProvidersAndRouter } from 'utils/testHelpers';
import Layout from './Layout';

describe('Layout component', () => {
  const DummyChildComponent = () => <div>Dummy child component</div>;

  it('renders component correctly', () => {
    renderWithProvidersAndRouter(
      <Layout>
        <DummyChildComponent />
      </Layout>
    );

    const linkElement = screen.getByText(/dummy child component/i);
    expect(linkElement).toBeInTheDocument();
  });
});
