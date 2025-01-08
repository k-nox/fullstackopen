import Note from './components/Note';
import { useState } from 'react';

const App = ({ initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState('a new note...');

  const addNote = (event) => {
    event.preventDefault();
    setNotes(
      notes.concat({
        content: newNote,
        important: Math.random() < 0.5,
        id: notes.length + 1,
      }),
    );
    setNewNote('');
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};
export default App;
