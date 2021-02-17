import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import AddPersonForm from './components/AddPersonForm';
import Person from './components/Person';
import personServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });

  useEffect(() => {
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    if (newPerson.name && newPerson.number) {
      if (persons.some((person) => person.name === newPerson.name)) {
        alert(`${newPerson.name} is already added to the phonebook`);
      } else {
        personServices.create(newPerson).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewPerson({ name: '', number: '' });
        });
      }
    } else {
      alert('Please make sure to enter both a name and a number');
    }
  };

  const removePerson = (e) => {
    const personToDelete = persons.find((person) => person.id === +e.target.id);
    const confirmToDelete = window.confirm(`Delete ${personToDelete.name}?`);

    if (confirmToDelete) {
      personServices
        .remove(personToDelete.id)
        .then(() => setPersons(persons.filter((person) => person.id !== personToDelete.id)))
        .catch((error) => {
          alert(`${personToDelete.name} has already been deleted from the server`);
          setPersons(persons.filter((person) => person.id !== personToDelete.id));
        });
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
        <Person person={person} key={person.id} handleClick={removePerson} />
      ))}
    </div>
  );
};

export default App;
