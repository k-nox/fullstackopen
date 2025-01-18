import { hash } from 'bcrypt'
import { Router } from 'express'
import { User } from '../models/user.js'

export const userRouter = Router()

userRouter.post('/', async (request, response) => {
	const { username, password, name } = request.body
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

userRouter.get('/', async (_request, response) => {
	const users = await User.find({})
	response.json(users)
})
