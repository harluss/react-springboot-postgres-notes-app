import { Button, Checkbox, Container, FormControlLabel, makeStyles, TextField, Theme } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Prompt, useHistory } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { addNote } from './notesSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const useStyles = makeStyles((theme: Theme) => {
  return {
    button: {
      width: 120,
      marginTop: 30,
      marginLeft: 'auto',
    },
    checkbox: {
      marginBottom: 10,
    },
    field: {
      marginTop: 20,
      marginBottom: 10,
      display: 'block',
      background: theme.palette.background.paper,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

const addNoteSchema = yup.object().shape({
  title: yup.string().required(),
  details: yup.string().required(),
});

// TODO: extract schema

type Inputs = {
  title: string;
  details: string;
  isPinned: boolean;
};

const defaultValues: Inputs = {
  title: '',
  details: '',
  isPinned: false,
};

const unsavedChangesMessage = 'You have unsaved changes, are you sure you want to leave?';

const AddNote = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {
    control,
    formState: { isDirty, errors },
    handleSubmit,
    reset,
  } = useForm<Inputs>({ defaultValues, resolver: yupResolver(addNoteSchema) });

  const onSubmit = (data: Inputs) => {
    dispatch(addNote(data))
      .then(unwrapResult)
      .then(reset)
      .then(() => history.push('/'))
      .catch((error) => console.log('something went wrong:', error));
  };

  return (
    <Container maxWidth="sm">
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Prompt when={isDirty} message={unsavedChangesMessage} />
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className={classes.field}
              label="Title"
              variant="outlined"
              fullWidth
              required
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="details"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className={classes.field}
              label="Details"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={5}
              error={!!errors.details}
              helperText={errors.details?.message}
            />
          )}
        />
        <Controller
          name="isPinned"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              className={classes.checkbox}
              control={<Checkbox {...field} name="isPinned" color="primary" />}
              label="Pin Note"
            />
          )}
        />
        <Button className={classes.button} type="submit" variant="contained" color="primary" disableElevation>
          Add
        </Button>
      </form>
    </Container>
  );
};

export default AddNote;
