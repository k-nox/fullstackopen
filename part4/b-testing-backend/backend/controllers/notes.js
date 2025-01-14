import { Router } from 'express'
import Note from '../models/note.js'

const notesRouter = Router()

notesRouter.get('/', async (_request, response) => {
	const notes = await Note.find({})
	response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
	try {
		const note = await Note.findById(request.params.id)
		if (note) {
			response.json(note)
		} else {
			response.status(404).end()
		}
	} catch (exception) {
		next(exception)
	}
})

notesRouter.post('/', async (request, response, next) => {
	const { content, important } = request.body

	const note = new Note({
		content: content,
		important: important || false,
	})

	try {
		const savedNote = await note.save()
		response.status(201).json(savedNote)
	} catch (exception) {
		next(exception)
	}
})

notesRouter.delete('/:id', async (request, response, next) => {
	try {
		await Note.findByIdAndDelete(request.params.id)
		response.status(204).end()
	} catch (exception) {
		next(exception)
	}
})

notesRouter.put('/:id', (request, response, next) => {
	const { content, important } = request.body

	const note = { content, important }

	Note.findByIdAndUpdate(request.params.id, note, {
		new: true,
		runValidators: true,
	})
		.then((updatedNote) => {
			response.json(updatedNote)
		})
		.catch((error) => next(error))
})

export default notesRouter
