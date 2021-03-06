import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Note as NoteType } from 'types';
import { Message } from 'components/message/Message';
import { formatDateTime } from 'utils';
import { AlertDialog } from 'components/alertDialog';
import { useAppDispatch } from 'app/hooks';
import { deleteNote, editNote } from './notesSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { setSnackbar } from 'features/snackbar';
import { Paths } from 'types';
import {
  MESSAGE_NOTE_DELETE_WARNING,
  MESSAGE_NO_NOTE_SELECTED,
  SNACKBAR_NOTE_DELETE_ERROR,
  SNACKBAR_NOTE_DELETE_SUCCESS,
  SNACKBAR_NOTE_PIN_ERROR,
  SNACKBAR_NOTE_PIN_SUCCESS,
} from 'constants/const';

const useStyles = makeStyles((theme: Theme) => {
  return {
    button: {
      margin: theme.spacing(1),
    },
    date: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    dateContainer: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    menuContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    title: {
      marginTop: theme.spacing(3),
    },
  };
});

type LocationState = {
  note: NoteType;
};

export const Note = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { state: { note } = {} } = useLocation<LocationState>();
  const [isOpen, setIsOpen] = useState(false);

  if (!note) {
    return <Message messageText={MESSAGE_NO_NOTE_SELECTED} type="error" />;
  }

  const handleDeleteAlertDialog = () => setIsOpen(true);

  const handleDelete = () => {
    setIsOpen(false);

    dispatch(deleteNote(note.id))
      .then(unwrapResult)
      .then(() => {
        dispatch(setSnackbar({ message: SNACKBAR_NOTE_DELETE_SUCCESS, type: 'success' }));
        history.push(Paths.notes);
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(setSnackbar({ message: SNACKBAR_NOTE_DELETE_ERROR(error.message), type: 'error' }));
      });
  };

  const handleToggleIsPinned = () => {
    dispatch(editNote({ note, toggleIsPinned: true }))
      .then(unwrapResult)
      .then((updatedNote) => {
        dispatch(setSnackbar({ message: SNACKBAR_NOTE_PIN_SUCCESS(updatedNote.isPinned), type: 'success' }));
        history.push(Paths.viewNote, { note: updatedNote });
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(setSnackbar({ message: SNACKBAR_NOTE_PIN_ERROR(error.message), type: 'error' }));
      });
  };

  const handleEditNote = () => history.push(Paths.editNote, { note });

  const isNoteUpdated = () => note.createdAt !== note.updatedAt;

  return (
    <Container maxWidth="sm">
      <AlertDialog
        isOpen={isOpen}
        title="Delete Note?"
        details={MESSAGE_NOTE_DELETE_WARNING(note.title)}
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        confirmAction={handleDelete}
        setIsOpen={setIsOpen}
      />
      <div className={classes.menuContainer}>
        <Button
          className={classes.button}
          variant="outlined"
          color={note.isPinned ? 'primary' : 'default'}
          size="small"
          startIcon={note.isPinned ? <StarIcon /> : <StarBorderIcon />}
          onClick={handleToggleIsPinned}
        >
          {note.isPinned ? 'Unpin' : 'Pin'}
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          onClick={handleEditNote}
        >
          Edit
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<DeleteForeverIcon />}
          onClick={handleDeleteAlertDialog}
        >
          Delete
        </Button>
      </div>
      <Typography variant="h5" component="h1" className={classes.title}>
        {note.title}
      </Typography>
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
      <Typography variant="body1">{note.details}</Typography>
    </Container>
  );
};
