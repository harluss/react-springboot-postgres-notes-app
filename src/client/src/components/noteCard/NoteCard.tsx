import { Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import MoreVert from '@material-ui/icons/MoreVert';
import { useAppDispatch } from 'app/hooks';
import { deleteNote } from 'features/notes/notesSlice';
import { MouseEvent, useState } from 'react';
import { Note } from 'types';
import { formatDate } from 'utils/dateFormat';
import { setSnackbar } from 'features/snackbar';
import { unwrapResult } from '@reduxjs/toolkit';

const NoteCard = ({ note }: { note: Note }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleDelete = async () => {
    handleMenuClose();
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
      <Card variant="outlined">
        <CardHeader
          action={
            <div>
              <IconButton onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
              <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleMenuClose}>
                {/* <MenuItem onClick={handleMenuClose} disabled>
                  Pin
                </MenuItem>
                <MenuItem onClick={handleMenuClose} disabled>
                  Edit
                </MenuItem> */}
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          }
          title={note.title}
          subheader={formatDate(note.createdAt)}
        />
        <CardContent>
          <Typography color="textSecondary">{note.details}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteCard;
