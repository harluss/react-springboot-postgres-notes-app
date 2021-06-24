import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Note as NoteType } from 'types';
import { Message } from 'components/message/Message';
import { formatDateTime } from 'utils/dateFormat';
import { AlertDialog } from 'components/alertDialog';
import { useAppDispatch } from 'app/hooks';
import { deleteNote, editNote } from './notesSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { setSnackbar } from 'features/snackbar';
import { Paths } from 'types';

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
  const [noteDetails, setNoteDetails] = useState<NoteType>();
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useLocation<LocationState>();
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    if (state?.note) {
      setNoteDetails(state.note);
    }
  }, [state?.note]);

  if (!noteDetails) {
    return <Message messageText="Oops! Did you forget to select note?" type="error" />;
  }

  const handleDeleteAlertDialog = () => setIsOpen(true);

  const handleDelete = () => {
    setIsOpen(false);

    dispatch(deleteNote(noteDetails.id))
      .then(unwrapResult)
      .then(() => {
        dispatch(setSnackbar({ isOpen: true, message: 'Note deleted', type: 'success' }));
        history.push(Paths.notes);
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(setSnackbar({ isOpen: true, message: 'Failed to delete note', type: 'error' }));
      });
  };

  const isEdited = () => noteDetails.createdAt !== noteDetails.updatedAt;

  const handleToggleIsPinned = () => {
    dispatch(editNote({ note: noteDetails, toggleIsPinned: true }))
      .then(unwrapResult)
      .then((updatedNote) => {
        dispatch(
          setSnackbar({
            isOpen: true,
            message: `Note ${updatedNote.isPinned ? 'pinned' : 'unpinned'}`,
            type: 'success',
          })
        );
        history.push(Paths.viewNote, { note: updatedNote });
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(setSnackbar({ isOpen: true, message: 'Failed to update note', type: 'error' }));
      });
  };

  const handleEditNote = () => {
    history.push(Paths.editNote, { note: noteDetails });
  };

  return (
    <Container maxWidth="sm">
      <AlertDialog
        isOpen={isOpen}
        title="Delete Note?"
        details={`Note "${noteDetails.title}" will be deleted.`}
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        confirmAction={handleDelete}
        setIsOpen={setIsOpen}
      />
      <div className={classes.menuContainer}>
        <Button
          className={classes.button}
          variant="outlined"
          color={noteDetails.isPinned ? 'primary' : 'default'}
          size="small"
          startIcon={noteDetails.isPinned ? <StarIcon /> : <StarBorderIcon />}
          onClick={handleToggleIsPinned}
        >
          {noteDetails.isPinned ? 'Unpin' : 'Pin'}
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
        {noteDetails.title}
      </Typography>
      <div className={classes.dateContainer}>
        <div className={classes.date}>
          <Typography variant="subtitle1" color="textSecondary">
            Created:
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {formatDateTime(noteDetails.createdAt)}
          </Typography>
        </div>
        {isEdited() && (
          <div className={classes.date}>
            <Typography variant="subtitle1" color="textSecondary">
              Last edited:
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {formatDateTime(noteDetails.updatedAt)}
            </Typography>
          </div>
        )}
      </div>
      <Typography variant="body1">{noteDetails.details}</Typography>
    </Container>
  );
};
