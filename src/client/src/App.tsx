import { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';

interface Note {
  id: number;
  title: string;
  details: string;
}

const App = (): ReactElement => {
  const [notes, setNotes] = useState<Array<Note>>([]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('/api/v1/notes');
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
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

export default App;
