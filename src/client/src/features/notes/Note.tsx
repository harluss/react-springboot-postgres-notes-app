import { makeStyles, Theme, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
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
    date: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    menuContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    title: {
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
      <div className={classes.menuContainer}>
        <Tooltip title="Pin/Unpin">
          <IconButton onClick={() => console.log('pin')}>
            {noteDetails.isPinned ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton onClick={() => console.log('edit')}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => console.log('delete')}>
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Typography variant="h5" component="h1" className={classes.title}>
        {noteDetails.title}
      </Typography>
      <div className={classes.date}>
        <Typography variant="subtitle1" color="textSecondary">
          Created:
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {formatDateTime(noteDetails.createdAt)}
        </Typography>
      </div>
      <div className={classes.date}>
        <Typography variant="subtitle1" color="textSecondary">
          Last updated:
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {formatDateTime(noteDetails.updatedAt)}
        </Typography>
      </div>
      <Typography variant="body1" className={classes.body}>
        {noteDetails.details}
      </Typography>
    </Container>
  );
};

export default Note;
