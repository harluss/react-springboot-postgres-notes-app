import { useEffect, useState } from 'react';
import { Prompt, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Note as NoteType, NoteInputs } from 'types';
import { Message } from 'components/message';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { FormInput } from 'components/formInput';
import { formatDateTime } from 'utils/dateFormat';
import { useAppSelector } from 'app/hooks';
import { selectNotesStatus } from './notesSlice';
import { ProgressIndicator } from 'components/progressIndicator';
import { NoteSchema } from 'schema';

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

const defaultValues: NoteInputs = {
  title: '',
  details: '',
  isPinned: false,
};

type LocationState = {
  note: NoteType;
};

const unsavedChangesMessage = 'You have unsaved changes, are you sure you want to leave?';

export const EditNote = () => {
  const classes = useStyles();
  const progress = useAppSelector(selectNotesStatus);
  const history = useHistory();
  const {
    control,
    formState: { isDirty, errors },
    handleSubmit,
    // reset,
    setValue,
  } = useForm<NoteInputs>({ defaultValues, resolver: yupResolver(NoteSchema) });
  const { state } = useLocation<LocationState>();
  const [noteToEdit, setNoteToEdit] = useState<NoteType>();

  useEffect(() => {
    if (state?.note) {
      setNoteToEdit(state.note);
    }
  }, [state?.note]);

  if (!noteToEdit) {
    return <Message messageText="Oops! Did you forget to select note?" type="error" />;
  }

  const onSubmit = () => {
    console.log('submit');
  };

  const handleCancel = () => history.goBack();

  const isEdited = () => noteToEdit.createdAt !== noteToEdit.updatedAt;

  if (progress === 'processing') {
    return <ProgressIndicator />;
  }

  return (
    <Container maxWidth="sm">
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Prompt when={isDirty} message={unsavedChangesMessage} />
        <FormInput
          name="title"
          label="Title"
          id="title-input"
          control={control}
          errors={errors}
          value={noteToEdit?.title}
          setValue={setValue}
          required
          autofocus
        />
        <div className={classes.dateContainer}>
          <div className={classes.date}>
            <Typography variant="subtitle1" color="textSecondary">
              Created:
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {formatDateTime(noteToEdit.createdAt)}
            </Typography>
          </div>
          {isEdited() && (
            <div className={classes.date}>
              <Typography variant="subtitle1" color="textSecondary">
                Last edited:
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {formatDateTime(noteToEdit.updatedAt)}
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
          value={noteToEdit?.details}
          setValue={setValue}
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
          setValue={setValue}
          type="checkbox"
        />
        <div className={classes.buttonsContainer}>
          <Button className={classes.button} onClick={handleCancel} variant="outlined" color="primary" disableElevation>
            Cancel
          </Button>
          <Button className={classes.button} type="submit" variant="contained" color="primary" disableElevation>
            Save
          </Button>
        </div>
      </form>
    </Container>
  );
};
