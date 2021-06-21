import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchNotes, selectNotesState } from './notesSlice';
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
import { setSnackbar } from 'features/snackbar';
import { unwrapResult } from '@reduxjs/toolkit';
import { Message } from 'components/message/Message';

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

type LocationState = {
  stateUpdated?: boolean;
};

const Notes = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectNotesState);
  const sortBy = useAppSelector(selectSortBy);
  const theme = useTheme();
  const location = useLocation<LocationState>();
  const history = useHistory();

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
    if (location.state?.stateUpdated) {
      return history.replace('/');
    }

    const promise = dispatch(fetchNotes());

    promise.then(unwrapResult).catch((error) => {
      if (error.name !== 'AbortError') {
        console.log(error);
        dispatch(setSnackbar({ isOpen: true, message: `Failed to load notes: ${error.message}`, type: 'error' }));
      }
    });

    return () => promise.abort();
  }, []);

  if (status === 'processing') {
    return <ProgressIndicator />;
  }

  if (status === 'failed') {
    return <Message messageText="Oops! Something went wrong..." type="error" />;
  }

  if (status === 'succeeded' && !data.length) {
    return <Message messageText="You have no saved notes" />;
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
        {data.length &&
          [...data]
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
