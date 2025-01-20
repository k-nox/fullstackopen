import { useEffect, useRef, useState } from 'react';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import Note from './components/Note';
import { NoteForm } from './components/NoteForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import loginService from './services/login';
import noteService from './services/notes';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [user, setUser] = useState(null);
	const noteFormRef = useRef();

	useEffect(() => {
		noteService.getAll().then((initialNotes) => setNotes(initialNotes));
	}, []);

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem('loggedInNoteAppUser');
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON);
			setUser(user);
			noteService.setToken(user.token);
		}
	}, []);

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) =>
				setNotes(notes.map((note) => (note.id === id ? returnedNote : note))),
			)
			.catch((error) => {
				setErrorMessage(
					`Note "${note.content}" was already removed from server`,
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	const addNote = async (noteObject) => {
		noteFormRef.current.toggleVisibility();
		const newNote = await noteService.create(noteObject);
		setNotes(notes.concat(newNote));
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	const handleLogin = async (userObject) => {
		try {
			const user = await loginService.login(userObject);

			window.localStorage.setItem('loggedInNoteAppUser', JSON.stringify(user));

			noteService.setToken(user.token);
			setUser(user);
		} catch (exception) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem('loggedInNoteAppUser');
		noteService.setToken(null);
		setUser(null);
	};

	const loginForm = () => {
		return (
			<Toggleable buttonLabel="login">
				<LoginForm login={handleLogin} />
			</Toggleable>
		);
	};

	const noteForm = () => (
		<div>
			<button type="button" onClick={handleLogout}>
				logout
			</button>
			<Toggleable buttonLabel="new note" ref={noteFormRef}>
				<NoteForm createNote={addNote} />
			</Toggleable>
		</div>
	);

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />

			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>{user.name} logged-in</p>
					{noteForm()}
				</div>
			)}

			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>
			<Footer />
		</div>
	);
};
export default App;
