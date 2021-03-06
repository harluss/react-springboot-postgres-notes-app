import { fireEvent, render, screen } from 'utils';
import { AlertDialog } from './AlertDialog';

describe('AlertDialog component', () => {
  it('displays title and details and handles callback functions', () => {
    const confirm = jest.fn();
    const cancel = jest.fn();

    render(
      <AlertDialog
        isOpen={true}
        title="Dummy title"
        details={`Dummy details`}
        cancelButtonText="Cancel"
        confirmButtonText="Confirm"
        confirmAction={confirm}
        setIsOpen={cancel}
      />
    );

    expect(screen.getByText(/dummy title/i)).toBeInTheDocument();
    expect(screen.getByText(/dummy details/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/confirm/i));
    expect(confirm).toHaveBeenCalled();

    fireEvent.click(screen.getByText(/cancel/i));
    expect(cancel).toHaveBeenCalled();
  });

  it.todo('does not close on backdrop click or escape button press');
});
