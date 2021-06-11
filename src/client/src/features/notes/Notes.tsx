import { MouseEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchNotes, selectAllNotes, selectNotesStatus } from './notesSlice';
import NoteCard from 'components/noteCard/NoteCard';
import Masonry from 'react-masonry-css';
import { Container, Fab, makeStyles, Theme, useScrollTrigger, useTheme, Zoom } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import Progress from 'components/progress/Progress';
import KeyboardArrowUpOutlined from '@material-ui/icons/KeyboardArrowUpOutlined';

const useStyles = makeStyles((theme: Theme) => {
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
    scrollUpButtom: {
      position: 'fixed',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  };
});

type locationState = {
  noteAdded?: boolean;
};

const ScrollTopButton = () => {
  const classes = useStyles();
  const trigger = useScrollTrigger();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} className={classes.scrollUpButtom}>
        <Fab color="secondary" size="small">
          <KeyboardArrowUpOutlined />
        </Fab>
      </div>
    </Zoom>
  );
};

const Notes = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectAllNotes);
  const progress = useAppSelector(selectNotesStatus);
  const theme = useTheme();
  const location = useLocation<locationState>();
  const history = useHistory();

  const breakpoints = {
    default: 5,
    [theme.breakpoints.values.xl]: 4,
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

  if (progress === 'processing') {
    return <Progress />;
  }

  return (
    <>
      <Container maxWidth="xl">
        <div id="back-to-top-anchor" />
        <Masonry breakpointCols={breakpoints} className={classes.grid} columnClassName={classes.gridColumn}>
          {notes.map((note) => (
            <div key={note.id} className={classes.gridColumnChild}>
              <NoteCard note={note} />
            </div>
          ))}
        </Masonry>
      </Container>
      <ScrollTopButton />
    </>
  );
};

export default Notes;
