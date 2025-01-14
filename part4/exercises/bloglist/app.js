import express, { json } from 'express'
import cors from 'cors'
import { config } from './utils/config.js'
import { connect } from 'mongoose'
import { logMiddleware } from './utils/middleware.js'
import { blogRouter } from './controllers/blogs.js'

export const app = express()


connect(config.MONGODB_URI)

app.use(cors())
app.use(json())
app.use(logMiddleware)

app.use('/api/blogs', blogRouter)
