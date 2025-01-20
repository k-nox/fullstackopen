import { useEffect, useState } from 'react'
import { Blog } from './components/Blog'
import { Login } from './components/Login'
import { getAllBlogs } from './services/blogs'
import { login } from './services/login'

function App() {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

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
	}

	const blogPage = () => (
		<div>
			<h2>blogs</h2>
			<p>
				{user.name} logged in{' '}
				<button type="button" onClick={handleLogout}>
					logout
				</button>
			</p>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)

	const loginPage = () => (
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

	return <div>{user === null ? loginPage() : blogPage()}</div>
}

export default App
