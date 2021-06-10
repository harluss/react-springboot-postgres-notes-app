import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchNotes, selectAllNotes } from './notesSlice';
import NoteCard from 'components/noteCard/NoteCard';
import Masonry from 'react-masonry-css';
import { Container, makeStyles, useTheme } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles(() => {
  return {
    grid: {
      display: 'flex',
      marginLeft: -30,
      width: 'auto',
    },
    gridColumn: {
      paddingLeft: 30,
      backgroundClip: 'padding-box',
    },
    gridColumnChild: {
      marginBottom: 30,
    },
  };
});

type locationState = {
  noteAdded?: boolean;
};

const Notes = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectAllNotes);
  const theme = useTheme();
  const location = useLocation<locationState>();
  const history = useHistory();

  const breakpoints = {
    default: 4,
    [theme.breakpoints.values.lg]: 3,
    [theme.breakpoints.values.md]: 2,
    [theme.breakpoints.values.sm]: 1,
  };

  useEffect(() => {
    if (location.state?.noteAdded) {
      return history.replace('/');
    }

    const promise = dispatch(fetchNotes());

    return () => promise.abort();
  }, []);

  return (
    <Container maxWidth="xl">
      <Masonry breakpointCols={breakpoints} className={classes.grid} columnClassName={classes.gridColumn}>
        {notes.map((note) => (
          <div key={note.id} className={classes.gridColumnChild}>
            <NoteCard note={note} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
};

export default Notes;
