import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchNotes, selectNotesState } from './notesSlice';
import { NoteCard } from './NoteCard';
import Masonry from 'react-masonry-css';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { ProgressIndicator } from 'components/progressIndicator';
import { ScrollUpButton } from 'components/scrollUpButton';
import { SortBy, SortByKeys } from 'types';
import { selectSortBy, setSortDate } from 'features/settings';
import { setSnackbar } from 'features/snackbar';
import { unwrapResult } from '@reduxjs/toolkit';
import { Message } from 'components/message';
import {
  ABORT_REQ_ERROR_NAME,
  MESSAGE_GENERIC_ERROR,
  MESSAGE_NO_NOTES_SAVED,
  SNACKBAR_NOTES_LOAD_ERROR,
} from 'constants/const';

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

export const Notes = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectNotesState);
  const sortBy = useAppSelector(selectSortBy);
  const theme = useTheme();

  const breakpoints = {
    default: 5,
    [theme.breakpoints.values.xl]: 4,
    [theme.breakpoints.values.lg]: 3,
    [theme.breakpoints.values.md]: 2,
    [theme.breakpoints.values.sm]: 1,
  };

  const handleSortChange = (event: ChangeEvent<{ value: unknown }>) =>
    dispatch(setSortDate(event.target.value as SortByKeys));

  const sortByDate = (dateA: string, dateB: string) =>
    sortBy === 'dateDown' ? dateB.localeCompare(dateA) : dateA.localeCompare(dateB);

  const sortByIsPinned = (isPinnedA: boolean, isPinnedB: boolean) => Number(isPinnedB) - Number(isPinnedA);

  useEffect(() => {
    if (status !== 'idle') {
      return;
    }

    const promise = dispatch(fetchNotes());

    promise.then(unwrapResult).catch((error) => {
      if (error.name !== ABORT_REQ_ERROR_NAME) {
        dispatch(setSnackbar({ message: SNACKBAR_NOTES_LOAD_ERROR(error.message), type: 'error' }));
      }
    });

    return () => promise.abort();
  }, []);

  if (status === 'processing') {
    return <ProgressIndicator />;
  }

  if (status === 'failed') {
    return <Message messageText={MESSAGE_GENERIC_ERROR} type="error" />;
  }

  if (status === 'succeeded' && !data.length) {
    return <Message messageText={MESSAGE_NO_NOTES_SAVED} />;
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
            .sort((a, b) => sortByIsPinned(a.isPinned, b.isPinned) || sortByDate(a.createdAt, b.createdAt))
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
