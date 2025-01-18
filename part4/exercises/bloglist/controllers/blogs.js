import { Router } from 'express'
import jwt from 'jsonwebtoken'
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

const getTokenFrom = (request) => {
	const auth = request.get('authorization')
	if (auth && auth.startsWith('Bearer ')) {
		return auth.replace('Bearer ', '')
	}
	return null
}

blogRouter.post('/', async (request, response) => {
	const { title, url, author, likes } = request.body
	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}

	const user = await User.findById(decodedToken.id)

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
