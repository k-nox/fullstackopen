import cors from 'cors'
import express, { json } from 'express'
import mongoose, { connect } from 'mongoose'
import 'express-async-errors'
import { blogRouter } from './controllers/blogs.js'
import { logger } from './utils/logger.js'
import { errorHandler, logMiddleware } from './utils/middleware.js'

export const app = (mongoURI) => {
	const a = express()
	mongoose.set('strictQuery', false)
	connect(mongoURI).then(logger.info(`connected to mongoose`))
	a.use(cors())
	a.use(json())
	if (process.env.NODE_ENV !== 'test') {
		a.use(logMiddleware)
	}
	a.use('/api/blogs', blogRouter)
	a.use(errorHandler)
	return a
}
