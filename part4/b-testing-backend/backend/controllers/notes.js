import { Router } from 'express'
import Note from '../models/note.js'

const notesRouter = Router()

notesRouter.get('/', (_request, response) => {
	Note.find({}).then((notes) => {
		response.json(notes)
	})
})

notesRouter.get('/:id', (request, response, next) => {
	Note.findById(request.params.id)
		.then((note) => {
			if (note) {
				response.json(note)
			} else {
				response.status(404).end()
			}
		})
		.catch((error) => next(error))
})

notesRouter.post('/', (request, response, next) => {
	const { content, important } = request.body
	const note = new Note({
		content: content,
		important: important || false,
	})

	note
		.save()
		.then((savedNote) => {
			response.json(savedNote)
		})
		.catch((error) => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
	Note.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch((error) => next(error))
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
