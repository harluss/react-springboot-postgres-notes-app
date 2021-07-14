import { makeStyles, Theme, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useAppDispatch } from 'app/hooks';
import { MouseEvent, useState } from 'react';
import { Note } from 'types';
import { formatDate } from 'utils/dateFormat';
import { AlertDialog } from 'components/alertDialog';
import { unwrapResult } from '@reduxjs/toolkit';
import { setSnackbar } from 'features/snackbar';
import { deleteNote } from 'features/notes';
import { Link, useHistory } from 'react-router-dom';
import { editNote } from 'features/notes/notesSlice';
import { Paths } from 'types';
import {
  MESSAGE_NOTE_DELETE_WARNING,
  SNACKBAR_NOTE_DELETE_ERROR,
  SNACKBAR_NOTE_DELETE_SUCCESS,
  SNACKBAR_NOTE_PIN_ERROR,
  SNACKBAR_NOTE_PIN_SUCCESS,
} from 'constants/const';

const useStyles = makeStyles((theme: Theme) => {
  return {
    cardHeader: {
      marginRight: theme.spacing(3),
    },
    cardMenu: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      right: 0,
    },
    content: {
      display: '-webkit-box',
      WebkitLineClamp: 5,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    root: {
      position: 'relative',
      borderColor: (isPinned) => (isPinned ? theme.palette.primary.main : ''),
      borderWidth: (isPinned) => (isPinned ? 2 : 1),
    },
  };
});

export const NoteCard = ({ note }: { note: Note }) => {
  const classes = useStyles(note.isPinned);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleDeleteAlertDialog = () => {
    handleMenuClose();
    setIsAlertDialogOpen(true);
  };

  const handleDelete = () => {
    setIsAlertDialogOpen(false);

    dispatch(deleteNote(note.id))
      .then(unwrapResult)
      .then(() => dispatch(setSnackbar({ message: SNACKBAR_NOTE_DELETE_SUCCESS, type: 'success' })))
      .catch((error) => {
        console.log(error.message);
        dispatch(setSnackbar({ message: SNACKBAR_NOTE_DELETE_ERROR(error.message), type: 'error' }));
      });
  };

  const handleToggleIsPinned = () => {
    handleMenuClose();

    dispatch(editNote({ note, toggleIsPinned: true }))
      .then(unwrapResult)
      .then((updatedNote) =>
        dispatch(setSnackbar({ message: SNACKBAR_NOTE_PIN_SUCCESS(updatedNote.isPinned), type: 'success' }))
      )
      .catch((error) => {
        console.log(error.message);
        dispatch(setSnackbar({ message: SNACKBAR_NOTE_PIN_ERROR(error.message), type: 'error' }));
      });
  };

  const handleEditNote = () => history.push(Paths.editNote, { note });

  return (
    <div>
      <AlertDialog
        isOpen={isAlertDialogOpen}
        title="Delete Note?"
        details={MESSAGE_NOTE_DELETE_WARNING(note.title)}
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        confirmAction={handleDelete}
        setIsOpen={setIsAlertDialogOpen}
      />
      <Card variant="outlined" className={classes.root}>
        <div>
          <IconButton onClick={handleMenuOpen} className={classes.cardMenu} data-testid="card-menu-icon-button">
            <MoreVertIcon />
          </IconButton>
          <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleMenuClose}>
            <MenuItem onClick={handleToggleIsPinned}>
              <ListItemIcon>
                {note.isPinned ? <StarIcon color="primary" fontSize="small" /> : <StarBorderIcon fontSize="small" />}
              </ListItemIcon>
              {note.isPinned ? 'Unpin' : 'Pin'}
            </MenuItem>
            <MenuItem onClick={handleEditNote}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              Edit
            </MenuItem>
            <MenuItem onClick={handleDeleteAlertDialog}>
              <ListItemIcon>
                <DeleteForeverIcon fontSize="small" />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        </div>
        <CardActionArea component={Link} to={{ pathname: Paths.viewNote, state: { note } }}>
          <CardHeader title={note.title} subheader={formatDate(note.createdAt)} className={classes.cardHeader} />
          <CardContent>
            <Typography className={classes.content} color="textSecondary">
              {note.details}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};
