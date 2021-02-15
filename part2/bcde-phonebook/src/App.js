import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import AddPersonForm from './components/AddPersonForm';
import Person from './components/Person';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    if (newPerson.name !== '' && newPerson.number !== '') {
      if (persons.some((person) => person.name === newPerson.name)) {
        alert(`${newPerson.name} is already added to the phonebook`);
      } else {
        setPersons(persons.concat(newPerson));
        setNewPerson({ name: '', number: '' });
      }
    } else {
      alert('Please make sure to enter both a name and a number');
    }
  };

  const handleChange = (e) => {
    e.target.getAttribute('id') === 'name'
      ? setNewPerson({ ...newPerson, name: e.target.value })
      : setNewPerson({ ...newPerson, number: e.target.value });
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
        <Person name={person.name} number={person.number} key={person.name} />
      ))}
    </div>
  );
};

export default App;
