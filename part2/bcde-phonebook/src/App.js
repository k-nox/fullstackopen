import React, { useState } from 'react';
import Filter from './components/Filter';
import AddPersonForm from './components/AddPersonForm';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' },
  ]);
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [newPerson, setNewPerson] = useState({ name: '', phone: '' });

  const addPerson = (e) => {
    e.preventDefault();

    if (newPerson.name !== '' && newPerson.phone !== '') {
      if (persons.some((person) => person.name === newPerson.name)) {
        alert(`${newPerson.name} is already added to the phonebook`);
      } else {
        setPersons(persons.concat(newPerson));
        setNewPerson({ name: '', phone: '' });
      }
    } else {
      alert('Please make sure to enter both a name and a number');
    }
  };

  const handleChange = (e) => {
    e.target.getAttribute('id') === 'name'
      ? setNewPerson({ ...newPerson, name: e.target.value })
      : setNewPerson({ ...newPerson, phone: e.target.value });
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
      <Filter search={search} handleSearch={handleSearch} />
      <AddPersonForm addPerson={addPerson} newPerson={newPerson} handleChange={handleChange} />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Person name={person.name} phone={person.phone} key={person.name} />
      ))}
    </div>
  );
};

export default App;
