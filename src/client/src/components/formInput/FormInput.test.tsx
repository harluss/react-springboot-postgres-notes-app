import { render, screen } from 'utils';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { NoteInputs } from 'types';
import { FormInput } from './FormInput';

describe('FromInput component', () => {
  const FormInputTestComponent = ({
    errors,
    type = undefined,
  }: {
    errors: DeepMap<NoteInputs, FieldError>;
    type?: 'checkbox';
  }) => {
    const { control } = useForm<NoteInputs>();

    return (
      <FormInput
        name="details"
        label="Details"
        id="details-input"
        control={control}
        errors={errors}
        required
        type={type}
      />
    );
  };

  it('renders input as textbox by default', () => {
    render(<FormInputTestComponent errors={{}} />);

    expect(screen.getByLabelText(/details/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /details/i })).toBeInTheDocument();
  });

  it('shows validation error', () => {
    const dummyErrors = { details: { message: 'details is a required field', type: 'required' } };
    render(<FormInputTestComponent errors={dummyErrors} />);

    expect(screen.getByLabelText(/details/i)).toBeInTheDocument();
    expect(screen.getByText(dummyErrors.details.message)).toBeInTheDocument();
  });

  it('renders as checkbox when checkbox passed as type', () => {
    render(<FormInputTestComponent errors={{}} type="checkbox" />);

    expect(screen.getByLabelText(/details/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /details/i })).toBeInTheDocument();
  });
});
