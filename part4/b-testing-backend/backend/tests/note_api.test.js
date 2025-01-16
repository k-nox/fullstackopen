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
		const noteObjects = initialNotes.map((note) => new Note(note))
		const promises = noteObjects.map((note) => note.save())
		await Promise.all(promises)
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

	test('a specific note can be viewed', async () => {
		const notesAtStart = await notesInDb()

		const noteToView = notesAtStart[0]

		const resultNote = await api
			.get(`/api/notes/${noteToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		assert.deepStrictEqual(resultNote.body, noteToView)
	})

	test('a note can be deleted', async () => {
		const notesAtStart = await notesInDb()
		const noteToDelete = notesAtStart[0]

		await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

		const notesAtEnd = await notesInDb()

		const contents = notesAtEnd.map((r) => r.content)
		assert(!contents.includes(noteToDelete.content))
		assert.strictEqual(notesAtEnd.length, initialNotes.length - 1)
	})

	after(async () => {
		await mongoose.connection.close()
		await mongoServer.stop()
	})
})
