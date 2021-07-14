import { FocusEvent, useEffect, useMemo } from 'react';
import { Prompt, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Note as NoteType, NoteEdit, NoteEditInputs, Paths } from 'types';
import { Message } from 'components/message';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { FormInput } from 'components/formInput';
import { formatDateTime } from 'utils';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { editNote, selectNotesStatus } from './notesSlice';
import { ProgressIndicator } from 'components/progressIndicator';
import { NoteSchema } from 'validation';
import { unwrapResult } from '@reduxjs/toolkit';
import { setSnackbar } from 'features/snackbar';
import {
  MESSAGE_NO_NOTE_SELECTED,
  MESSAGE_UNSAVED_CHANGES,
  SNACKBAR_NOTE_EDIT_ERROR,
  SNACKBAR_NOTE_EDIT_SUCCESS,
} from 'constants/const';

const useStyles = makeStyles((theme: Theme) => {
  return {
    body: {
      marginTop: theme.spacing(3),
    },
    button: {
      width: 120,
      marginTop: 30,
      marginLeft: theme.spacing(2),
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    date: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    dateContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

type LocationState = {
  note: NoteType;
};

export const EditNote = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const progress = useAppSelector(selectNotesStatus);
  const history = useHistory();
  const { state: { note } = {} } = useLocation<LocationState>();
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    setValue,
  } = useForm<NoteEdit>({
    defaultValues: useMemo(() => note, [note]),
    resolver: yupResolver(NoteSchema),
  });

  useEffect(() => {
    reset(note);
  }, [note]);

  if (!note) {
    return <Message messageText={MESSAGE_NO_NOTE_SELECTED} type="error" />;
  }

  const onSubmit = (data: NoteEdit) => {
    const updatedNote = { ...note, ...data };

    dispatch(editNote({ note: updatedNote }))
      .then(unwrapResult)
      .then(reset)
      .then(() => {
        dispatch(setSnackbar({ message: SNACKBAR_NOTE_EDIT_SUCCESS, type: 'success' }));
        history.push(Paths.notes);
      })
      .catch((error) => {
        console.log(error);
        dispatch(setSnackbar({ message: SNACKBAR_NOTE_EDIT_ERROR(error.message), type: 'error' }));
      });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: NoteEditInputs; value: string };
    setValue(name, value.trim());
  };

  const handleCancel = () => history.goBack();

  const isNoteUpdated = () => note.createdAt !== note.updatedAt;

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
        <div className={classes.dateContainer}>
          <div className={classes.date}>
            <Typography variant="subtitle1" color="textSecondary">
              Created:
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {formatDateTime(note.createdAt)}
            </Typography>
          </div>
          {isNoteUpdated() && (
            <div className={classes.date}>
              <Typography variant="subtitle1" color="textSecondary">
                Last updated:
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {formatDateTime(note.updatedAt)}
              </Typography>
            </div>
          )}
        </div>
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
          onBlur={handleBlur}
        />
        <div className={classes.buttonsContainer}>
          <Button className={classes.button} onClick={handleCancel} variant="outlined" color="primary" disableElevation>
            Cancel
          </Button>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            disabled={!isDirty}
          >
            Save
          </Button>
        </div>
      </form>
    </Container>
  );
};
