import { useEffect, useState } from 'react'
import { Blog } from './components/Blog'
import { CreateBlogForm } from './components/CreateBlogForm'
import { Login } from './components/Login'
import { Notification } from './components/Notification'
import { createBlog, getAllBlogs } from './services/blogs'
import { login } from './services/login'
import './app.css'

function App() {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const [notification, setNotification] = useState(null)

	useEffect(() => {
		const fetchBlogs = async () => {
			const blogs = await getAllBlogs()
			setBlogs(blogs)
		}
		fetchBlogs()
	}, [])

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedInUserJSON) {
			const loggedInUser = JSON.parse(loggedInUserJSON)
			setUser(loggedInUser)
		}
	}, [])

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			const user = await login({ username, password })
			setUser(user)
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
			setUsername('')
			setPassword('')
			setNotification({
				message: `${user.name} successfully logged in`,
				type: 'success',
			})
			setTimeout(() => setNotification(null), 5000)
		} catch (exception) {
			setNotification({
				message: 'wrong username or password',
				type: 'error',
			})
			setTimeout(() => setNotification(null), 5000)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedInUser')
		setUser(null)
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	const handleCreateBlog = async (e) => {
		e.preventDefault()
		try {
			const newBlog = await createBlog(
				{
					title: title,
					author: author,
					url: url,
				},
				user.token,
			)

			setBlogs([...blogs, newBlog])
			setTitle('')
			setAuthor('')
			setUrl('')
			setNotification({
				message: `added the blog ${newBlog.title} by ${newBlog.author}`,
				type: 'success',
			})
			setTimeout(() => setNotification(null), 5000)
		} catch (exception) {
			setNotification({
				message: exception.response.data.error,
				type: 'error',
			})
			setTimeout(() => setNotification(null), 5000)
		}
	}

	const loggedInView = () => (
		<div>
			<p>
				{user.name} logged in{' '}
				<button type="button" onClick={handleLogout}>
					logout
				</button>
			</p>
			<h3>create new</h3>
			<CreateBlogForm
				title={title}
				onTitleChange={({ target }) => setTitle(target.value)}
				author={author}
				onAuthorChange={({ target }) => setAuthor(target.value)}
				url={url}
				onUrlChange={({ target }) => setUrl(target.value)}
				onSubmit={handleCreateBlog}
			/>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)

	const loggedOutView = () => (
		<div>
			<Login
				username={username}
				onUsernameChange={({ target }) => setUsername(target.value)}
				password={password}
				onPasswordChange={({ target }) => setPassword(target.value)}
				onSubmit={handleLogin}
			/>
		</div>
	)

	return (
		<div>
			<h2>{user === null ? 'blogs' : 'login to application'}</h2>
			{notification && (
				<Notification message={notification.message} type={notification.type} />
			)}
			{user === null ? loggedOutView() : loggedInView()}
		</div>
	)
}

export default App
