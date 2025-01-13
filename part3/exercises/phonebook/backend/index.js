import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import Person from './models/person.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body);
});

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
    ];
    if (request.method === 'POST') {
      t.push(tokens.body(request, response));
    }
    return t.join(' ');
  }),
);

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/info', (request, response) => {
  const timestamp = new Date();
  const label = persons.length > 1 ? 'people' : 'person';
  const message = `<p>Phonebook has info for ${persons.length} ${label}</p><p>${timestamp}</p>`;
  response.send(message);
});

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => response.json(persons))
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send();
  }
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).send())
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;
  if (!body || !body.name || !body.number) {
    return response
      .status(400)
      .json({ error: 'must provide both name and number' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error));
});

app.use((error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  }
  next(error);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
