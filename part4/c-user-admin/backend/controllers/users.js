import { hash } from 'bcrypt'
import { Router } from 'express'
import User from '../models/user.js'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	const saltRounds = 10
	const passwordHash = await hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

export default usersRouter
