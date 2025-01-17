import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Person from './models/person.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (request) => {
	return JSON.stringify(request.body)
})

app.use(
	morgan((tokens, request, response) => {
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
	}),
)

app.get('/info', (request, response, next) => {
	const timestamp = new Date()
	Person.countDocuments({})
		.then((count) => {
			const label = count > 1 ? 'people' : 'person'
			const message = `<p>Phonebook has info for ${count} ${label}</p><p>${timestamp}</p>`
			response.send(message)
		})
		.catch((error) => next(error))
})

app.get('/api/persons', (request, response, next) => {
	Person.find({})
		.then((persons) => response.json(persons))
		.catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).send()
			}
		})
		.catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(() => response.status(204).send())
		.catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body
	if (!body || !body.name || !body.number) {
		return response
			.status(400)
			.json({ error: 'must provide both name and number' })
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person
		.save()
		.then((savedPerson) => response.json(savedPerson))
		.catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body

	Person.findByIdAndUpdate(
		request.params.id,
		{ name, number },
		{ new: true, runValidators: true },
	)
		.then((updatedPerson) => response.json(updatedPerson))
		.catch((error) => next(error))
})

app.use((error, request, response, next) => {
	console.error(error.message)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformed id' })
	}

	if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message })
	}

	next(error)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`)
})
