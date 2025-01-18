import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { Blog } from '../models/blog.js'
import { User } from '../models/user.js'
import { userExtractor } from '../utils/middleware.js'

export const blogRouter = Router()

blogRouter.get('/', async (_request, response) => {
	const blogs = await Blog.find({}).populate('user', {
		username: 1,
		name: 1,
	})
	response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
	const { title, url, author, likes } = request.body
	const user = request.user

	const blog = new Blog({
		title,
		url,
		author,
		likes,
		user: user.id,
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(blog)
	await user.save()
	response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
	const user = request.user

	const blog = await Blog.findById(request.params.id)

	if (blog.user.toString() !== user.id) {
		return response
			.status(401)
			.json({ error: 'blog must belong to user to delete' })
	}

	await Blog.findByIdAndDelete(blog.id)
	response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
	const { url, title, author, likes } = request.body
	const blog = { url, title, author, likes }

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
		runValidators: true,
	})

	response.json(updatedBlog)
})
