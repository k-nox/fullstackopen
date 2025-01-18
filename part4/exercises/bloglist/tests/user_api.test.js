import assert from 'node:assert'
import { after, before, beforeEach, describe, test } from 'node:test'
import { hash } from 'bcrypt'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app.js'
import { User } from '../models/user.js'
import { usersInDb } from './helper.js'

describe('user api', () => {
	let mongoServer
	let api

	before(async () => {
		mongoServer = await MongoMemoryServer.create()
		api = supertest(app(mongoServer.getUri()))
	})

	beforeEach(async () => {
		await User.deleteMany({})
		const pwHash = await hash('supersecret', 10)
		const user = new User({
			username: 'knox13',
			name: 'Knox',
			passwordHash: pwHash,
		})

		await user.save()
	})

	after(async () => {
		await mongoose.connection.close()
		await mongoServer.stop()
	})

	describe('when getting all users', () => {
		test('users are returned as JSON in the correct format', async () => {
			const response = await api
				.get('/api/users')
				.expect(200)
				.expect('Content-Type', /application\/json/)

			assert.strictEqual(response.body.length, 1)
			assert.strictEqual(response.body[0].username, 'knox13')
			assert.strictEqual(response.body[0].name, 'Knox')
			assert.ok(!Object.hasOwn(response.body[0], '_id'))
			assert.ok(Object.hasOwn(response.body[0], 'id'))
		})
	})

	describe('when creating users', () => {
		test.only('succeeds and updates the database', async () => {
			const usersAtStart = await usersInDb()

			const newUser = {
				username: 'knox1313',
				name: 'Not Knox',
				password: 'thisissecret',
			}

			const response = await api
				.post('/api/users')
				.send(newUser)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd = await usersInDb()
			assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
			const newUserInDb = usersAtEnd.find((u) => u.id === response.body.id)
			assert.deepStrictEqual(response.body, newUserInDb)
		})
	})
})
