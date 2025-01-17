import Note from '../models/note.js'
import User from '../models/user.js'

export const initialNotes = [
	{
		content: 'HTML is easy',
		important: false,
	},
	{
		content: 'Browser can execute only JavaScript',
		important: true,
	},
]

export const nonExistingId = async () => {
	const note = new Note({ content: 'willremovethissoon' })
	await note.save()
	await note.deleteOne()

	return note._id.toString()
}

export const notesInDb = async () => {
	const notes = await Note.find({})
	return notes.map((note) => note.toJSON())
}

export const usersInDb = async () => {
	const users = await User.find({})
	return users.map((user) => user.toJSON())
}
