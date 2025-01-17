import { Router } from 'express'
import jwt from 'jsonwebtoken'
import Note from '../models/note.js'
import User from '../models/user.js'

const notesRouter = Router()

notesRouter.get('/', async (_request, response) => {
	const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
	response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
	const note = await Note.findById(request.params.id).populate('user', {
		username: 1,
		name: 1,
	})
	if (note) {
		response.json(note)
	} else {
		response.status(404).end()
	}
})

const getTokenFrom = (request) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}

	return null
}

notesRouter.post('/', async (request, response) => {
	const { content, important } = request.body

	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	const user = await User.findById(decodedToken.id)

	const note = new Note({
		content: content,
		important: important || false,
		user: user.id,
	})

	const savedNote = await note.save()
	user.notes = user.notes.concat(savedNote._id)
	await user.save()
	response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
	await Note.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

notesRouter.put('/:id', async (request, response) => {
	const { content, important } = request.body

	const note = { content, important }

	const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
		new: true,
		runValidators: true,
	})

	response.json(updatedNote)
})

export default notesRouter
