import Note from './components/Note';
import { useState } from 'react';

const App = ({ initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

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

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
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
