import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-7890' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([
        ...persons,
        {
          name: newName,
          number: newNumber,
        },
      ]);
      setNewName('');
      setNewNumber('');
    }
  };

  const names = persons.map((person) => (
    <li key={person.name}>
      {person.name} {person.number}
    </li>
  ));

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{names}</ul>
    </div>
  );
};

export default App;
