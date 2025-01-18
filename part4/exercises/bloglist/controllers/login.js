import { compare } from 'bcrypt'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

export const loginRouter = Router()

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body

	const user = await User.findOne({ username })
	const passwordCorrect =
		user === null ? false : await compare(password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password',
		})
	}

	const token = jwt.sign(
		{ username: user.username, id: user.id },
		process.env.SECRET,
		{ expiresIn: 60 * 60 },
	)

	response.status(200).send({ token, username: user.username, name: user.name })
})
