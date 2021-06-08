import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchNotes, selectAllNotes } from './notesSlice';
import { Container, Grid } from '@material-ui/core';
import NoteCard from 'components/NoteCard';

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
    <Container>
      <p>some notes:</p>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={3} key={note.id}>
            <NoteCard note={note} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Notes;
