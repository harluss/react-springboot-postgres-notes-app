import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchNotes, selectAllNotes } from './notesSlice';
import NoteCard from 'components/noteCard2/NoteCard';
import Masonry from 'react-masonry-css';
import { makeStyles, useTheme } from '@material-ui/core';

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

const Notes = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectAllNotes);
  const theme = useTheme();

  const breakpoints = {
    default: 4,
    [theme.breakpoints.values.lg]: 3,
    [theme.breakpoints.values.md]: 2,
    [theme.breakpoints.values.sm]: 1,
  };

  const getNotes = async () => {
    dispatch(fetchNotes());

    // TODO: cancel thunk od component unmount
    // return () => promise.abort();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <Masonry breakpointCols={breakpoints} className={classes.grid} columnClassName={classes.gridColumn}>
        {notes.map((note) => (
          <div key={note.id} className={classes.gridColumnChild}>
            <NoteCard note={note} />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Notes;
