import morgan from 'morgan'
import { logger } from './logger.js'

morgan.token('body', (request) => {
	const body = { ...request.body }
	if (Object.hasOwn(body, 'password')) {
		delete body.password
	}
	return JSON.stringify(body)
})

export const logMiddleware = morgan((tokens, request, response) => {
	const t = [
		tokens.method(request, response),
		tokens.url(request, response),
		tokens.status(request, response),
		tokens.res(request, response, 'content-length'),
		'-',
		tokens['response-time'](request, response),
		'ms',
	]
	if (request.method === 'POST') {
		t.push(tokens.body(request, response))
	}
	return t.join(' ')
})

export const tokenExtractor = (request, _response, next) => {
	const auth = request.get('authorization')
	if (auth && auth.startsWith('Bearer ')) {
		request.token = auth.replace('Bearer ', '')
	}
	next()
}

export const errorHandler = (error, _request, response, next) => {
	logger.error(error.message)

	switch (error.name) {
		case 'CastError':
			return response.status(400).json({ error: 'malformed id' })
		case 'ValidationError':
			return response.status(400).json({ error: error.message })
		case 'MongoServerError':
			if (error.message.includes('E11000 duplicate key error')) {
				return response
					.status(400)
					.json({ error: 'expected `username` to be unique' })
			}
			break
		case 'JsonWebTokenError':
			return response.status(401).json({ error: 'invalid token' })
	}
	next(error)
}
