import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchNotes, selectAllNotes } from './notesSlice';

const Notes = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectAllNotes);

  const getNotes = async () => {
    dispatch(fetchNotes());

    // return () => promise.abort();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <p>some notes:</p>
      {notes.map((note) => (
        <p key={note.id}>{note.title}</p>
      ))}
    </div>
  );
};

export default Notes;
