import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

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

app.get('/api/persons', (request, response) => {
  response.json(persons);
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

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);
  response.status(201).send();
});

const generateId = () => {
  const min = Math.ceil(10);
  const max = Math.floor(10000);
  return Math.floor(Math.random() * (max - min) + min);
};

app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body) {
    return response
      .status(400)
      .json({ error: 'must provide person in json body' });
  }

  if (!body.name) {
    return response.status(422).json({ error: 'must provide name' });
  }

  if (!body.number) {
    return response.status(422).json({ error: 'must provide number' });
  }

  if (persons.some((p) => p.name === body.name)) {
    return response.status(422).json({ error: 'name must be unique' });
  }

  const person = {
    name: request.body.name,
    number: request.body.number,
    id: String(generateId()),
  };

  // hacky way to guarantee a new id for now
  while (persons.some((p) => p.id === person.id)) {
    person.id = String(generateId());
  }

  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});