import { makeStyles, Theme, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Note as NoteType } from 'types';
import { Message } from 'components/message/Message';
import { formatDateTime } from 'utils/dateFormat';

const useStyles = makeStyles((theme: Theme) => {
  return {
    body: {
      marginTop: theme.spacing(2),
    },
    container: {
      height: `calc(100vh - 110px)`,
    },
    title: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  };
});

type LocationState = {
  note: NoteType;
};

const Note = () => {
  const classes = useStyles();
  const [noteDetails, setNoteDetails] = useState<NoteType>();
  const { state } = useLocation<LocationState>();

  useEffect(() => {
    if (state?.note) {
      setNoteDetails(state.note);
    }
  }, []);

  if (!noteDetails) {
    return <Message messageText="Oops! Did you forget to select note?" type="error" />;
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h4" component="h1" className={classes.title}>
        {noteDetails.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Created: {formatDateTime(noteDetails.createdAt)}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Updated: {formatDateTime(noteDetails.updatedAt)}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Pinned: {noteDetails.isPinned ? 'Yes' : 'No'}
      </Typography>
      <Typography variant="body1" className={classes.body}>
        {noteDetails.details}
      </Typography>
    </Container>
  );
};

export default Note;
