import { Blog } from '../models/blog.js'
import { blogs } from './fixtures.js'

export const blogModels = blogs.map(({ title, author, url, likes }) => {
	return new Blog({
		title,
		author,
		url,
		likes,
	})
})

export const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map((blog) => blog.toJSON())
}
