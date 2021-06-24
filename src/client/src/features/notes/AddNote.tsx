import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Prompt, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addNote, selectNotesStatus } from './notesSlice';
import { setSnackbar } from 'features/snackbar';
import { unwrapResult } from '@reduxjs/toolkit';
import { ProgressIndicator } from 'components/progressIndicator';
import { NoteInputs, Paths } from 'types';
import { FormInput } from 'components/formInput';
import { NoteSchema } from 'schema';

const useStyles = makeStyles((theme: Theme) => {
  return {
    button: {
      width: 120,
      marginTop: 30,
      marginLeft: theme.spacing(2),
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

const defaultValues: NoteInputs = {
  title: '',
  details: '',
  isPinned: false,
};

const unsavedChangesMessage = 'You have unsaved changes, are you sure you want to leave?';

// TODO: replace browser's prompt with alertDialog

export const AddNote = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const progress = useAppSelector(selectNotesStatus);
  const history = useHistory();
  const {
    control,
    formState: { isDirty, errors },
    handleSubmit,
    reset,
  } = useForm<NoteInputs>({ defaultValues, resolver: yupResolver(NoteSchema) });

  // TODO: add white space trimming function

  const onSubmit = (data: NoteInputs) => {
    dispatch(addNote(data))
      .then(unwrapResult)
      .then(reset)
      .then(() => {
        dispatch(setSnackbar({ message: 'Note added', type: 'success' }));
        history.push(Paths.notes);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSnackbar({ message: `Failed to add note ${error.message}`, type: 'error' }));
      });
  };

  const handleCancel = () => history.goBack();

  if (progress === 'processing') {
    return <ProgressIndicator />;
  }

  return (
    <Container maxWidth="sm">
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Prompt when={isDirty} message={unsavedChangesMessage} />
        <FormInput name="title" label="Title" id="title-input" control={control} errors={errors} required autofocus />
        <FormInput
          name="details"
          label="Details"
          id="details-input"
          control={control}
          errors={errors}
          required
          multiline
          rows={5}
        />
        <FormInput
          name="isPinned"
          label="Pin Note"
          id="is-pinned-checkbox"
          control={control}
          errors={errors}
          type="checkbox"
        />
        <div className={classes.buttonsContainer}>
          <Button className={classes.button} onClick={handleCancel} variant="outlined" color="primary" disableElevation>
            Cancel
          </Button>
          <Button className={classes.button} type="submit" variant="contained" color="primary" disableElevation>
            Add
          </Button>
        </div>
      </form>
    </Container>
  );
};
