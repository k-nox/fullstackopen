import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import notesRouter from './controllers/notes.js'
import config from './utils/config.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'

const app = express()

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('conneced to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
