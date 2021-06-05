import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, selectNotes } from './notesSlice';

const Notes = (): ReactElement => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);

  const getNotes = async () => {
    try {
      dispatch(fetchNotes());
    } catch (error) {
      console.error(error);
    }
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
