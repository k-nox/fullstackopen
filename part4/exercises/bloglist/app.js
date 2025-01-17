import cors from 'cors'
import express, { json } from 'express'
import mongoose, { connect } from 'mongoose'
import { blogRouter } from './controllers/blogs.js'
import { logMiddleware } from './utils/middleware.js'

export const app = (mongoURI) => {
	const a = express()
	mongoose.set('strictQuery', false)
	connect(mongoURI).then(console.log('connected to mongoose'))
	a.use(cors())
	a.use(json())
	a.use(logMiddleware)
	a.use('/api/blogs', blogRouter)
	return a
}
