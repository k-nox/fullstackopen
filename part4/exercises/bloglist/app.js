import cors from 'cors'
import express, { json } from 'express'
import { connect } from 'mongoose'
import { blogRouter } from './controllers/blogs.js'
import { config } from './utils/config.js'
import { logMiddleware } from './utils/middleware.js'

export const app = express()

connect(config.MONGODB_URI)

app.use(cors())
app.use(json())
app.use(logMiddleware)

app.use('/api/blogs', blogRouter)
