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
		await Blog.deleteMany({})
		const promises = blogModels().map((model) => model.save())
		await Promise.all(promises)
	})

	after(async () => {
		await mongoose.connection.close()
		await mongoServer.stop()
	})

	describe('when listing all blogs', () => {
		test('the correct number of blogs are returned as json', async () => {
			const response = await api
				.get('/api/blogs')
				.expect(200)
				.expect('Content-Type', /application\/json/)

			assert.strictEqual(response.body.length, blogs.length)
		})

		test('blogs each have an id property and not an _id property', async () => {
			const response = await api.get('/api/blogs').expect(200)
			const blogs = response.body
			blogs.forEach((blog) => {
				assert(Object.hasOwn(blog, 'id'))
				assert(!Object.hasOwn(blog, '_id'))
			})
		})
	})

	describe('adding new blogs', () => {
		test('succeeds with valid data', async () => {
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

		test('sets likes to 0 if missing', async () => {
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

		test('responds with 400 if the title is missing', async () => {
			const newBlog = {
				author: 'Knox',
				url: 'http://knox.example.com',
				likes: 1,
			}

			await api.post('/api/blogs').send(newBlog).expect(400)
			const blogsAtEnd = await blogsInDb()
			assert(blogsAtEnd.length, blogs.length)
		})

		test('responds with 400 if the url is missing', async () => {
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

	describe('deleting a blog', () => {
		test('succeeds with valid id', async () => {
			const blogsAtStart = await blogsInDb()
			const blogToDelete = blogsAtStart[0]

			await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

			const blogsAtEnd = await blogsInDb()
			assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
			assert(!blogsAtEnd.some((blog) => blog.id === blogToDelete.id))
		})

		test('responds with 400 if the id is invalid', async () => {
			const invalidId = 'abcdefg'
			await api.delete(`/api/blogs/${invalidId}`).expect(400)
			const blogsAtEnd = await blogsInDb()
			assert.strictEqual(blogsAtEnd.length, blogs.length)
		})
	})

	describe('updating a blog', () => {
		test('succeeds with valid data and id', async () => {
			const blogsAtStart = await blogsInDb()
			const blogToUpdate = blogsAtStart[0]

			const response = await api
				.put(`/api/blogs/${blogToUpdate.id}`)
				.send({
					title: blogToUpdate.title,
					url: blogToUpdate.url,
					author: blogToUpdate.author,
					likes: blogToUpdate.likes + 1,
				})
				.expect(200)
				.expect('Content-Type', /application\/json/)

			const blogsAtEnd = await blogsInDb()
			const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id)
			assert.deepStrictEqual(updatedBlog, response.body)
			assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1)
		})

		test('fails with 400 if id is invalid', async () => {
			const invalidId = 'abcdefg'
			await api
				.put(`/api/blogs/${invalidId}`)
				.send({
					title: "Knox's cool blog",
					author: 'Knox',
					url: 'http://knox.example.com',
					likes: 1,
				})
				.expect(400)
		})
	})
})
