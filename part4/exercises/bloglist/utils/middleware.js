import morgan from 'morgan'

morgan.token('body', (request) => {
	return JSON.stringify(request.body)
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
