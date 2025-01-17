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
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformed id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

export default { requestLogger, unknownEndpoint, errorHandler }
