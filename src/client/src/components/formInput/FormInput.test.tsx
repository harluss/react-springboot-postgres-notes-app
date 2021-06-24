import { render, screen } from '@testing-library/react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { NoteInputs } from 'types';
import { FormInput } from './FormInput';

describe('FromInput component', () => {
  const FormInputTestComponent = ({ errors }: { errors: DeepMap<NoteInputs, FieldError> }) => {
    const { control } = useForm<NoteInputs>();

    return <FormInput name="details" label="Details" id="details-input" control={control} errors={errors} required />;
  };

  it('renders component correctly', () => {
    render(<FormInputTestComponent errors={{}} />);

    expect(screen.getByLabelText(/details/i)).toBeInTheDocument();
  });

  it('shows validation error', () => {
    const dummyErrors = { details: { message: 'details is a required field', type: 'required' } };
    render(<FormInputTestComponent errors={dummyErrors} />);

    expect(screen.getByLabelText(/details/i)).toBeInTheDocument();
    expect(screen.getByText(/details is a required field/i)).toBeInTheDocument();
  });
});
