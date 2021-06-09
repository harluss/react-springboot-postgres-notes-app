import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchNotes, selectAllNotes } from './notesSlice';
import { Grid } from '@material-ui/core';
import NoteCard from 'components/noteCard/NoteCard';

const Notes = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectAllNotes);

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
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={2} key={note.id}>
            <NoteCard note={note} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Notes;
