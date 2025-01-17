import { Router } from 'express'
import { Blog } from '../models/blog.js'

export const blogRouter = Router()

blogRouter.get('/', async (_request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	const result = await blog.save()
	response.status(201).json(result)
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
