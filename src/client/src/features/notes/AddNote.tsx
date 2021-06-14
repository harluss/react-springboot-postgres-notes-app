import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Prompt, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addNote, selectNotesStatus } from './notesSlice';
import { setSnackbar } from 'features/snackbar';
import { unwrapResult } from '@reduxjs/toolkit';
import ProgressIndicator from 'components/progressIndicator/ProgressIndicator';

const useStyles = makeStyles((theme: Theme) => {
  return {
    button: {
      width: 120,
      marginTop: 30,
      marginLeft: 'auto',
    },
    checkbox: {
      marginBottom: 10,
      fill: theme.palette.background.paper,
    },
    container: {
      height: `calc(100vh - 110px)`,
    },
    field: {
      marginTop: 20,
      marginBottom: 10,
      display: 'block',
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
  isPinned: yup.boolean(),
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
  const progress = useAppSelector(selectNotesStatus);
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
      .then(() => dispatch(setSnackbar({ isOpen: true, message: 'Note added', type: 'success' })))
      .then(() => history.push('/', { noteAdded: true }))
      .catch((error) => {
        console.log(error.message);
        dispatch(setSnackbar({ isOpen: true, message: 'Failed to add note', type: 'error' }));
      });
  };

  if (progress === 'processing') {
    return <ProgressIndicator />;
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
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
              autoFocus
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
