import assert from 'node:assert'
import { after, before, beforeEach, describe, test } from 'node:test'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app.js'
import { Blog } from '../models/blog.js'
import { blogs } from './fixtures.js'
import { blogModels, blogsInDb } from './helper.js'

describe('blog list api', () => {
	let mongoServer
	let api

	before(async () => {
		mongoServer = await MongoMemoryServer.create()
		api = supertest(app(mongoServer.getUri()))
	})

	beforeEach(async () => {
		Blog.deleteMany({})
		const promises = blogModels.map((model) => model.save())
		return Promise.all(promises)
	})

	after(async () => {
		await mongoose.connection.close()
		await mongoServer.stop()
	})

	test('should return correct number of blogs as json', async () => {
		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		assert.strictEqual(response.body.length, blogs.length)
	})

	test('should return blogs that have an id, not an _id', async () => {
		const response = await api.get('/api/blogs').expect(200)
		const blogs = response.body
		blogs.forEach((blog) => {
			assert(Object.hasOwn(blog, 'id'))
			assert(!Object.hasOwn(blog, '_id'))
		})
	})

	test('should correctly add new blogs', async () => {
		const newBlog = {
			title: "Knox's cool blog",
			author: 'Knox',
			url: 'http://knox.example.com',
			likes: 1,
		}

		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await blogsInDb()

		assert.strictEqual(blogsAtEnd.length, blogs.length + 1)
		const inserted = blogsAtEnd.find((blog) => blog.id === response.body.id)
		assert.ok(inserted) // make sure it's not undefined

		assert.strictEqual(inserted.title, newBlog.title)
		assert.strictEqual(inserted.author, newBlog.author)
		assert.strictEqual(inserted.url, newBlog.url)
		assert.strictEqual(inserted.likes, newBlog.likes)
	})

	test('should set likes to 0 if missing when creating a new blog', async () => {
		const newBlog = {
			title: "Knox's cool blog",
			author: 'Knox',
			url: 'http://knox.example.com',
		}

		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await blogsInDb()
		const inserted = blogsAtEnd.find((blog) => blog.id === response.body.id)
		assert.ok(inserted) // make sure it's not undefined
		assert.strictEqual(inserted.likes, 0)
	})

	test('should respond with 400 if the title is missing', async () => {
		const newBlog = {
			author: 'Knox',
			url: 'http://knox.example.com',
			likes: 1,
		}

		await api.post('/api/blogs').send(newBlog).expect(400)
		const blogsAtEnd = await blogsInDb()
		assert(blogsAtEnd.length, blogs.length)
	})

	test('should respond with 400 if the url is missing', async () => {
		const newBlog = {
			author: 'Knox',
			title: "Knox's cool blog",
			likes: 1,
		}

		await api.post('/api/blogs').send(newBlog).expect(400)
		const blogsAtEnd = await blogsInDb()
		assert(blogsAtEnd.length, blogs.length)
	})
})
