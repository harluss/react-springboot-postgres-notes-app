// import { screen } from '@testing-library/react';
import { renderWithProvidersAndRouter } from 'utils/testHelpers';
import { Notes } from './Notes';

describe('Notes component', () => {
  it('renders component correctly', () => {
    renderWithProvidersAndRouter({ component: <Notes /> });
  });
});
