import { useEffect, useState } from 'react'
import { Blog } from './components/Blog'
import { CreateBlogForm } from './components/CreateBlogForm'
import { Login } from './components/Login'
import { createBlog, getAllBlogs } from './services/blogs'
import { login } from './services/login'

function App() {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

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
		} catch (exception) {
			console.log(exception)
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
	}

	const loggedInView = () => (
		<div>
			<h2>blogs</h2>
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
			<h2>login to application</h2>
			<Login
				username={username}
				onUsernameChange={({ target }) => setUsername(target.value)}
				password={password}
				onPasswordChange={({ target }) => setPassword(target.value)}
				onSubmit={handleLogin}
			/>
		</div>
	)

	return <div>{user === null ? loggedOutView() : loggedInView()}</div>
}

export default App
