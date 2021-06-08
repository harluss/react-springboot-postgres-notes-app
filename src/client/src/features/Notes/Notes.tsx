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
        <div key={note.id}>
          <p>{note.title}</p>
          <p>{note.details}</p>
          <p>{note.isPinned.toString()}</p>
          <p>{note.createdAt}</p>
          <p>{note.updatedAt}</p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
