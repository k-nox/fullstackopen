import assert from 'node:assert'
import { after, before, beforeEach, describe, test } from 'node:test'
import { hash } from 'bcrypt'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app.js'
import User from '../models/user.js'
import { usersInDb } from './test_helper.js'

describe('user api', () => {
	let mongoServer
	let api
	before(async () => {
		mongoServer = await MongoMemoryServer.create()
		api = supertest(app(mongoServer.getUri()))
	})

	after(async () => {
		await mongoose.connection.close()
		mongoServer.stop()
	})

	describe('when there is intially one user in db', () => {
		beforeEach(async () => {
			await User.deleteMany({})

			const passwordHash = await hash('sekret', 10)
			const user = new User({ username: 'root', passwordHash })

			await user.save()
		})

		test('creation succeeds with a fresh username', async () => {
			const usersAtStart = await usersInDb()

			const newUser = {
				username: 'knox13',
				name: 'Knox',
				password: 'thisissecret',
			}

			await api
				.post('/api/users')
				.send(newUser)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd = await usersInDb()
			assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

			const usernames = usersAtEnd.map((u) => u.username)
			assert(usernames.includes(newUser.username))
		})
	})
})
