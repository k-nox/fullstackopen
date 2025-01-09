import { useEffect, useState } from 'react';
import NameFilter from './components/NameFilter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification.jsx';
import personService from './services/persons.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const existingPerson = () => {
    return persons.find((person) => person.name === newName);
  };

  const shouldUpdate = (person) => {
    return confirm(
      `${newName} is already added to the phonebook with existing number ${person.number}, would you like to replace it with ${newNumber}?`,
    );
  };

  const updateNumber = (person) => {
    personService
      .update(person.id, {
        ...person,
        number: newNumber,
      })
      .then((updatedPerson) => {
        setPersons(
          persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)),
        );
        setNewName('');
        setNewNumber('');
        setSuccessMessage(
          `Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`,
        );
        setTimeout(() => setSuccessMessage(null), 5000);
      });
  };

  const createPerson = () => {
    personService
      .create({
        name: newName,
        number: newNumber,
      })
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
        setSuccessMessage(`Added ${newPerson.name}`);
        setTimeout(() => setSuccessMessage(null), 5000);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existing = existingPerson();
    if (existing === undefined) {
      createPerson();
    } else if (shouldUpdate(existing)) {
      updateNumber(existing);
    }
  };

  const handleDelete = (id) => {
    personService.del(id).then((deletedPerson) => {
      setPersons(persons.filter((p) => p.id !== deletedPerson.id));
      setSuccessMessage(`Deleted ${deletedPerson.name}`);
      setTimeout(() => setSuccessMessage(null), 5000);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type={'success'} />
      <NameFilter
        value={nameFilter}
        handleChange={(event) => setNameFilter(event.target.value)}
      />
      <h3>add a new number</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNewNameChange={(event) => setNewName(event.target.value)}
        handleNewNumberChange={(event) => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
