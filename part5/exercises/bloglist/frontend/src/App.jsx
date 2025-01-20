import { useEffect, useState } from 'react'
import { Blog } from './components/Blog'
import { getAllBlogs } from './services/blogs'

function App() {
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		const fetchBlogs = async () => {
			const blogs = await getAllBlogs()
			setBlogs(blogs)
		}
		fetchBlogs()
	}, [])

	return (
		<div>
			<h2>blogs</h2>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default App
