import { Router } from 'express'
import { Blog } from '../models/blog.js'

export const blogRouter = Router()

blogRouter.get('/', async (_request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)
	blog.save().then((result) => {
		response.status(201).json(result)
	})
})
