import assert from 'node:assert'
import { after, before, beforeEach, describe, test } from 'node:test'
import { hash } from 'bcrypt'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app.js'
import Note from '../models/note.js'
import User from '../models/user.js'
import {
	initialNotes,
	nonExistingId,
	notesInDb,
	token,
	userById,
	usersInDb,
} from './test_helper.js'

describe('notes api', () => {
	let mongoServer
	let api
	before(async () => {
		mongoServer = await MongoMemoryServer.create()
		api = supertest(app(mongoServer.getUri()))
	})

	after(async () => {
		await mongoose.connection.close()
		await mongoServer.stop()
	})

	describe('when there are some notes saved initially', () => {
		beforeEach(async () => {
			await Note.deleteMany({})
			await User.deleteMany({})

			const passwordHash = await hash('sekret', 10)
			const user = new User({ username: 'root', passwordHash })
			await user.save()

			const noteObjects = initialNotes.map(
				(note) =>
					new Note({
						content: note.content,
						important: note.important,
						userId: user.id,
					}),
			)
			const promises = noteObjects.map((note) => note.save())
			await Promise.all(promises)
		})

		test('notes are returned as json', async () => {
			await api
				.get('/api/notes')
				.expect(200)
				.expect('Content-Type', /application\/json/)
		})

		test('all notes are returned', async () => {
			const response = await api.get('/api/notes')
			assert.strictEqual(response.body.length, initialNotes.length)
		})

		test('a specific note is returned within the returned notes', async () => {
			const response = await api.get('/api/notes')
			const contents = response.body.map((e) => e.content)
			assert(contents.includes('HTML is easy'))
		})

		describe('viewing a specific note', () => {
			test('succeeds with a valid id', async () => {
				const notesAtStart = await notesInDb()

				const noteToView = notesAtStart[0]

				const resultNote = await api
					.get(`/api/notes/${noteToView.id}`)
					.expect(200)
					.expect('Content-Type', /application\/json/)

				assert.deepStrictEqual(resultNote.body, noteToView)
			})

			test('fails with statuscode 404 if note does not exist', async () => {
				const validNonExistingId = await nonExistingId()
				await api.get(`/api/notes/${validNonExistingId}`).expect(404)
			})

			test('fails with statuscode 400 if id is invalid', async () => {
				const invalidId = 'abcdefg'
				await api.get(`/api/notes/${invalidId}`).expect(400)
			})
		})

		describe('addition of a new note', () => {
			test('succeeds with valid data', async () => {
				const users = await usersInDb()
				const user = users[0]
				const notesAtStart = user.notes
				const newNote = {
					content: 'async/await simplifies making async calls',
					important: true,
				}

				const response = await api
					.post('/api/notes')
					.auth(token(user), { type: 'bearer' })
					.send(newNote)
					.expect(201)
					.expect('Content-Type', /application\/json/)

				const notesAtEnd = await notesInDb()
				assert.strictEqual(notesAtEnd.length, initialNotes.length + 1)
				assert.strictEqual(response.body.user, user.id)

				const updatedUser = await userById(user.id)
				assert.strictEqual(updatedUser.notes.length, notesAtStart.length + 1)

				const contents = notesAtEnd.map((n) => n.content)
				assert(contents.includes('async/await simplifies making async calls'))
			})

			test('fails with 400 if data is invalid', async () => {
				const users = await usersInDb()
				const user = users[0]
				const notesAtStart = user.notes
				const newNote = {
					important: true,
				}

				await api
					.post('/api/notes')
					.send(newNote)
					.auth(token(user), { type: 'bearer' })
					.expect(400)

				const notesAtEnd = await notesInDb()
				assert.strictEqual(notesAtEnd.length, initialNotes.length)

				const userAtEnd = await userById(user.id)
				assert.strictEqual(userAtEnd.notes.length, notesAtStart.length)
			})

			test('fails with 401 if missing a valid token', async () => {
				const newNote = {
					content: 'this is a note',
					important: true,
				}

				await api.post('/api/notes').send(newNote).expect(401)

				const notesAtEnd = await notesInDb()
				assert.strictEqual(notesAtEnd.length, initialNotes.length)
			})
		})

		describe('deletion of a note', () => {
			test('succeeds with statuscode 204 if id if valid', async () => {
				const notesAtStart = await notesInDb()
				const noteToDelete = notesAtStart[0]

				await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

				const notesAtEnd = await notesInDb()

				const contents = notesAtEnd.map((r) => r.content)
				assert(!contents.includes(noteToDelete.content))
				assert.strictEqual(notesAtEnd.length, initialNotes.length - 1)
			})
		})
	})
})
