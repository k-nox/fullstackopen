import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', phone: '123-456-7890' }]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => (
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
