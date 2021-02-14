import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

  const addName = (e) => {
    e.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = {
        name: newName,
        phone: newPhoneNumber,
      };

      setPersons(persons.concat(personObject));
      setNewName('');
      setNewPhoneNumber('');
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    search ? setShowAll(false) : setShowAll(true);
  };

  const personsToShow = showAll
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search by name: <input value={search} onChange={handleSearch} />
      </div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newPhoneNumber} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.phone}
        </p>
      ))}
      <div>
        debug: {newName} {newPhoneNumber}
      </div>
    </div>
  );
};

export default App;
