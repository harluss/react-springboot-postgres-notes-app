import { screen, render } from '@testing-library/react';
import { Message } from './Message';

describe('Message component', () => {
  it('renders component correctly', () => {
    const { container } = render(<Message messageText="Good news" />);

    expect(container.querySelector('.makeStyles-errorIcon-4')).not.toBeInTheDocument();
    expect(screen.queryByText(/good news/i)).toBeInTheDocument();
  });

  it('renders component correctly with an icon', () => {
    const { container } = render(<Message messageText="Good news" type="error" />);

    expect(container.querySelector('.makeStyles-errorIcon-4')).toBeInTheDocument();
    expect(screen.queryByText(/good news/i)).toBeInTheDocument();
  });
});
