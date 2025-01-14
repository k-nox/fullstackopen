import assert from 'node:assert'
import { after, before, beforeEach, describe, test } from 'node:test'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app.js'
import Note from '../models/note.js'
import { initialNotes, nonExistingId, notesInDb } from './test_helper.js'

describe('notes', async () => {
	let mongoServer
	let api
	before(async () => {
		mongoServer = await MongoMemoryServer.create()
		api = supertest(app(mongoServer.getUri()))
	})

	beforeEach(async () => {
		await Note.deleteMany({})
		let noteObject = new Note(initialNotes[0])
		await noteObject.save()
		noteObject = new Note(initialNotes[1])
		await noteObject.save()
	})

	test('are returned as json', async () => {
		await api
			.get('/api/notes')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('there are two notes', async () => {
		const response = await api.get('/api/notes')
		assert.strictEqual(response.body.length, initialNotes.length)
	})

	test('the first note is about HTTP methods', async () => {
		const response = await api.get('/api/notes')
		const contents = response.body.map((e) => e.content)
		assert(contents.includes('HTML is easy'))
	})

	test('a valid note can be added', async () => {
		const newNote = {
			content: 'async/await simplifies making async calls',
			important: true,
		}

		await api
			.post('/api/notes')
			.send(newNote)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const notesAtEnd = await notesInDb()
		assert.strictEqual(notesAtEnd.length, initialNotes.length + 1)

		const contents = notesAtEnd.map((n) => n.content)
		assert(contents.includes('async/await simplifies making async calls'))
	})

	test('note without content is not added', async () => {
		const newNote = {
			important: true,
		}

		await api.post('/api/notes').send(newNote).expect(400)

		const notesAtEnd = await notesInDb()
		assert.strictEqual(notesAtEnd.length, initialNotes.length)
	})

	after(async () => {
		await mongoose.connection.close()
		await mongoServer.stop()
	})
})
