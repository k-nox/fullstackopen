import assert from 'node:assert'
import { after, before, beforeEach, describe, test } from 'node:test'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app.js'
import { Blog } from '../models/blog.js'
import { blogs } from './fixtures.js'
import { blogModels } from './helper.js'

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
})
