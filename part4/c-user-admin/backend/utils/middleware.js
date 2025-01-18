import logger from './logger.js'

const requestLogger = (request, _response, next) => {
	const body = { ...request.body }
	if (Object.hasOwn(body, 'password')) {
		delete body.password // don't log passwords!
	}
	logger.info('Method:', request.method)
	logger.info('Path:', request.path)
	logger.info('Body:', body)
	logger.info('---')
	next()
}

const unknownEndpoint = (_request, response) => {
	response.status(404).send({ error: 'unknownEndpoint' })
}

const errorHandler = (error, _request, response, next) => {
	logger.error(error.message)
	switch (error.name) {
		case 'CastError':
			return response.status(400).send({ error: 'malformed id' })
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
			return response.status(401).json({ error: 'token invalid' })
	}

	next(error)
}

export default { requestLogger, unknownEndpoint, errorHandler }
