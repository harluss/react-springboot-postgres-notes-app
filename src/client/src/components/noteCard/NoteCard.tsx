import { Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import { useAppDispatch } from 'app/hooks';
import { deleteNote } from 'features/notes/notesSlice';
import { MouseEvent, useState } from 'react';
import { Note } from 'types';

const NoteCard = ({ note }: { note: Note }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleMenuClose = () => setAnchorEl(null);

  const handleDelete = () => {
    dispatch(deleteNote(note.id));
    handleMenuClose();
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
                <MenuItem onClick={handleMenuClose} disabled>
                  Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          }
          title={note.title}
          subheader={note.createdAt}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteCard;
