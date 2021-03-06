import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Prompt, useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { addNote, selectNotesStatus } from './notesSlice';
import { setSnackbar } from 'features/snackbar';
import { ProgressIndicator } from 'components/progressIndicator';
import { FormInput } from 'components/formInput';
import { NoteAdd, NoteAddInputs, Paths } from 'types';
import { NoteSchema } from 'validation';
import { MESSAGE_UNSAVED_CHANGES, SNACKBAR_NOTE_ADD_SUCCESS, SNACKBAR_NOTE_ADD_ERROR } from 'constants/const';
import { FocusEvent } from 'react';

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

const defaultValues: NoteAdd = {
  title: '',
  details: '',
  isPinned: false,
};

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
    setValue,
  } = useForm<NoteAdd>({ defaultValues, resolver: yupResolver(NoteSchema) });

  const onSubmit = (data: NoteAdd) => {
    dispatch(addNote(data))
      .then(unwrapResult)
      .then(reset)
      .then(() => {
        dispatch(setSnackbar({ message: SNACKBAR_NOTE_ADD_SUCCESS, type: 'success' }));
        history.push(Paths.notes);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSnackbar({ message: SNACKBAR_NOTE_ADD_ERROR(error.message), type: 'error' }));
      });
  };

  const handleCancel = () => history.push(Paths.notes);

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: NoteAddInputs; value: string };
    setValue(name, value.trim());
  };

  if (progress === 'processing') {
    return <ProgressIndicator />;
  }

  return (
    <Container maxWidth="sm">
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Prompt when={isDirty} message={MESSAGE_UNSAVED_CHANGES} />
        <FormInput
          name="title"
          label="Title"
          id="title-input"
          control={control}
          errors={errors}
          required
          autofocus
          onBlur={handleBlur}
        />
        <FormInput
          name="details"
          label="Details"
          id="details-input"
          control={control}
          errors={errors}
          required
          multiline
          rows={5}
          onBlur={handleBlur}
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
