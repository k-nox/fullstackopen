import { Router } from 'express'
import { Blog } from '../models/blog.js'
import { User } from '../models/user.js'

export const blogRouter = Router()

blogRouter.get('/', async (_request, response) => {
	const blogs = await Blog.find({}).populate('user', {
		username: 1,
		name: 1,
	})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const { title, url, author, likes } = request.body
	const user = await User.findOne() // get an arbitrary user
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

blogRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
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
