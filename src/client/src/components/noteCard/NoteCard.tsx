import { CardActionArea, makeStyles, Theme, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useAppDispatch } from 'app/hooks';
import { MouseEvent, useState } from 'react';
import { Note } from 'types';
import { formatDate } from 'utils/dateFormat';
import AlertDialog from 'components/alertDialog/AlertDialog';
import { unwrapResult } from '@reduxjs/toolkit';
import { setSnackbar } from 'features/snackbar';
import { deleteNote } from 'features/notes';

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
    root: {
      position: 'relative',
    },
  };
});

const NoteCard = ({ note }: { note: Note }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleDeleteAlertDialog = () => {
    handleMenuClose();
    console.log(`delete note: ${note.title}`);
    // setIsOpen(true);
  };

  const handleDelete = () => {
    setIsOpen(false);

    dispatch(deleteNote(note.id))
      .then(unwrapResult)
      .then(() => dispatch(setSnackbar({ isOpen: true, message: 'Note deleted', type: 'success' })))
      .catch((error) => {
        console.log(error.message);
        dispatch(setSnackbar({ isOpen: true, message: 'Failed to delete note', type: 'error' }));
      });
  };

  return (
    <div>
      <AlertDialog
        isOpen={isOpen}
        title="Delete Note?"
        details={`Note "${note.title}" will be deleted.`}
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        confirmAction={handleDelete}
        setIsOpen={setIsOpen}
      />
      <Card variant="outlined" className={classes.root}>
        <div>
          <IconButton onClick={handleMenuOpen} className={classes.cardMenu}>
            <MoreVertIcon />
          </IconButton>
          <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose} disabled>
              Pin
            </MenuItem>
            <MenuItem onClick={handleMenuClose} disabled>
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
        <CardActionArea onClick={() => console.log(note.title)}>
          <CardHeader title={note.title} subheader={formatDate(note.createdAt)} className={classes.cardHeader} />
          <CardContent>
            <Typography color="textSecondary">{note.details}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default NoteCard;
