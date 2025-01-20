import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import 'express-async-errors'
import loginRouter from './controllers/login.js'
import notesRouter from './controllers/notes.js'
import usersRouter from './controllers/users.js'
import config from './utils/config.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'

export const app = (mongoURI) => {
	const a = express()
	mongoose.set('strictQuery', false)
	logger.info('connecting to', config.MONGODB_URI)
	mongoose
		.connect(mongoURI)
		.then(() => {
			logger.info('conneced to MongoDB')
		})
		.catch((error) => {
			logger.error('error connecting to MongoDB:', error.message)
		})

	a.use(cors())
	a.use(express.static('dist'))
	a.use(express.json())
	a.use(middleware.requestLogger)

	a.use('/api/notes', notesRouter)
	a.use('/api/users', usersRouter)
	a.use('/api/login', loginRouter)

	a.use(middleware.unknownEndpoint)
	a.use(middleware.errorHandler)
	return a
}
