import { Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import { Note } from 'types';

const NoteCard = ({ note }: { note: Note }) => {
  return (
    <div>
      <Card variant="outlined">
        <CardHeader
          action={
            <IconButton onClick={() => console.log('note options clicked:', note.title)}>
              <MoreVert />
            </IconButton>
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
