import jwt from 'jsonwebtoken'
import { Blog } from '../models/blog.js'
import { User } from '../models/user.js'
import { blogs } from './fixtures.js'

export const blogModels = (userId) => {
	return blogs.map(({ title, author, url, likes }) => {
		return new Blog({
			title,
			author,
			url,
			likes,
			user: userId,
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

export const token = ({ username, id }) => {
	return jwt.sign({ username, id }, process.env.SECRET)
}

export const userById = async (id) => {
	return await User.findById(id)
}
