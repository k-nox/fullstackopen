import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import Note from './components/Note';
import Notification from './components/Notification';
import loginService from './services/login';
import noteService from './services/notes';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [loginVisible, setLoginVisible] = useState(false);

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

	const addNote = (event) => {
		event.preventDefault();
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
		};

		noteService.create(noteObject).then((returnedNote) => {
			setNotes([...notes, returnedNote]);
			setNewNote('');
		});
	};

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem('loggedInNoteAppUser', JSON.stringify(user));

			noteService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
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
		const hideWhenVisible = { display: loginVisible ? 'none' : '' };
		const showWhenVisible = { display: loginVisible ? '' : 'none' };

		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={() => setLoginVisible(true)}>log in</button>
				</div>
				<div style={showWhenVisible}>
					<LoginForm
						username={username}
						password={password}
						handleUsernameChange={({ target }) => setUsername(target.value)}
						handlePasswordChange={({ target }) => setPassword(target.value)}
						handleSubmit={handleLogin}
					/>
					<button onClick={() => setLoginVisible(false)}>cancel</button>
				</div>
			</div>
		);
	};

	const noteForm = () => (
		<div>
			<button type="button" onClick={handleLogout}>
				logout
			</button>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type="submit">save</button>
			</form>
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
