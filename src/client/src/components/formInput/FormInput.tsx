import { Control, Controller, DeepMap, FieldError } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, Theme } from '@material-ui/core';
import { NoteInputs } from 'types';

const useStyles = makeStyles((theme: Theme) => {
  return {
    checkbox: {
      marginBottom: 10,
      fill: theme.palette.background.paper,
    },
    field: {
      marginTop: 20,
      marginBottom: 10,
      display: 'block',
    },
  };
});

type InputKeys = keyof NoteInputs;

type FormInputProps = {
  control: Control<NoteInputs>;
  errors: DeepMap<NoteInputs, FieldError>;
  name: InputKeys;
  label: string;
  id: string;
  autofocus?: boolean;
  multiline?: boolean;
  required?: boolean;
  rows?: number;
  type?: 'checkbox';
};

export const FormInput = ({
  control,
  id,
  label,
  name,
  errors,
  autofocus = false,
  multiline = false,
  required = false,
  rows = 1,
  type,
}: FormInputProps) => {
  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        if (type === 'checkbox') {
          return (
            <FormControlLabel
              className={classes.checkbox}
              control={<Checkbox {...field} checked={!!field.value} name={name} color="primary" />}
              id={id}
              label={label}
            />
          );
        }

        return (
          <TextField
            {...field}
            className={classes.field}
            id={id}
            label={label}
            variant="outlined"
            fullWidth
            autoFocus={autofocus}
            required={required}
            multiline={multiline}
            rows={rows}
            rowsMax={20}
            error={!!errors[name]}
            helperText={errors[name]?.message}
          />
        );
      }}
    />
  );
};
