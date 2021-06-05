import { render, screen } from '@testing-library/react';
import Notes from './Notes';

test('renders learn react link', () => {
  render(<Notes />);
  const linkElement = screen.getByText(/notes/i);
  expect(linkElement).toBeInTheDocument();
});
