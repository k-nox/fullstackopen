import assert from 'node:assert'
import { after, before, beforeEach, describe, test } from 'node:test'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../app.js'
import Note from '../models/note.js'

describe('notes', async () => {
	let mongoServer
	let api
	before(async () => {
		mongoServer = await MongoMemoryServer.create()
		api = supertest(app(mongoServer.getUri()))
	})

	const initialNotes = [
		{
			content: 'HTML is easy',
			important: false,
		},
		{
			content: 'Browser can execute only JavaScript',
			important: true,
		},
	]

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

	after(async () => {
		await mongoose.connection.close()
		await mongoServer.stop()
	})
})
