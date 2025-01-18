import { Blog } from '../models/blog.js'
import { User } from '../models/user.js'
import { blogs } from './fixtures.js'

export const blogModels = () => {
	return blogs.map(({ title, author, url, likes }) => {
		return new Blog({
			title,
			author,
			url,
			likes,
		})
	})
}

export const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map((blog) => blog.toJSON())
}

export const usersInDb = async () => {
	const users = await User.find({})
	return users.map((user) => user.toJSON())
}
