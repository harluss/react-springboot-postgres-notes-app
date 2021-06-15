import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchNotes, selectAllNotes, selectNotesStatus } from './notesSlice';
import NoteCard from 'components/noteCard/NoteCard';
import Masonry from 'react-masonry-css';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import ProgressIndicator from 'components/progressIndicator/ProgressIndicator';
import ScrollUpButton from 'components/scrollUpButton/ScrollUpButton';
import { SortBy, SortByKeys } from 'types';
import { selectSortBy, setSortDate } from 'features/settings';

const useStyles = makeStyles((theme: Theme) => {
  return {
    formControl: {
      marginBottom: theme.spacing(2),
      alignSelf: 'flex-end',
      minWidth: 120,
    },
    grid: {
      display: 'flex',
      marginLeft: -30,
      width: 'auto',
    },
    gridColumn: {
      paddingLeft: 20,
      backgroundClip: 'padding-box',
    },
    gridColumnChild: {
      marginBottom: 20,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
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
  const progress = useAppSelector(selectNotesStatus);
  const sortBy = useAppSelector(selectSortBy);
  const theme = useTheme();
  const location = useLocation<locationState>();
  const history = useHistory();

  // TODO: add messages to display for empty notes list on: 1. error fetching, 2. success but empty list

  const breakpoints = {
    default: 5,
    [theme.breakpoints.values.xl]: 4,
    [theme.breakpoints.values.lg]: 3,
    [theme.breakpoints.values.md]: 2,
    [theme.breakpoints.values.sm]: 1,
  };

  const handleSortChange = (event: ChangeEvent<{ value: unknown }>) =>
    dispatch(setSortDate(event.target.value as SortByKeys));

  const sortNotesByDate = (dateNoteA: string, dateNoteB: string) =>
    sortBy === 'dateDown' ? dateNoteB.localeCompare(dateNoteA) : dateNoteA.localeCompare(dateNoteB);

  useEffect(() => {
    if (location.state?.noteAdded) {
      return history.replace('/');
    }

    const promise = dispatch(fetchNotes());

    return () => promise.abort();
  }, []);

  if (progress === 'processing') {
    return <ProgressIndicator />;
  }

  return (
    <Container maxWidth="xl" className={classes.root}>
      <FormControl variant="outlined" size="small" className={classes.formControl}>
        <InputLabel id="sort-notes-select">Sort by</InputLabel>
        <Select
          labelId="sort-notes-select"
          label="Sort by"
          variant="outlined"
          value={sortBy}
          onChange={handleSortChange}
        >
          {Object.entries(SortBy).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div id="back-to-top-anchor" />
      <Masonry breakpointCols={breakpoints} className={classes.grid} columnClassName={classes.gridColumn}>
        {[...notes]
          .sort((a, b) => sortNotesByDate(a.createdAt, b.createdAt))
          .map((note) => (
            <div key={note.id} className={classes.gridColumnChild}>
              <NoteCard note={note} />
            </div>
          ))}
      </Masonry>
      <ScrollUpButton />
    </Container>
  );
};

export default Notes;
