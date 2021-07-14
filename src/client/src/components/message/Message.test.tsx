import { screen, render } from 'utils';
import { Message } from './Message';

describe('Message component', () => {
  it('displays message', () => {
    render(<Message messageText="Good news" />);

    expect(screen.queryByTestId('error-icon')).not.toBeInTheDocument();
    expect(screen.getByText(/good news/i)).toBeInTheDocument();
  });

  it('displays message with an error icon when error passed as type', () => {
    render(<Message messageText="Bad news" type="error" />);

    expect(screen.getByTestId('error-icon')).toBeInTheDocument();
    expect(screen.getByText(/bad news/i)).toBeInTheDocument();
  });
});
