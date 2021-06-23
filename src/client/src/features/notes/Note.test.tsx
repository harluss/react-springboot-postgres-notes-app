// import { screen } from '@testing-library/react';
import { renderWithProvidersAndRouter } from 'utils/testHelpers';
import Note from './Note';

describe('Note component', () => {
  it('renders component correctly', () => {
    renderWithProvidersAndRouter(<Note />);
  });
});
