import { screen, render } from 'utils/testHelpers';
import { Message } from './Message';

describe('Message component', () => {
  it('renders component correctly', () => {
    render(<Message messageText="Good news" />);

    expect(screen.queryByTestId('error-icon')).not.toBeInTheDocument();
    expect(screen.getByText(/good news/i)).toBeInTheDocument();
  });

  it('renders component correctly with an error icon', () => {
    render(<Message messageText="Good news" type="error" />);

    expect(screen.getByTestId('error-icon')).toBeInTheDocument();
    expect(screen.getByText(/good news/i)).toBeInTheDocument();
  });
});
