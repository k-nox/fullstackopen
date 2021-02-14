import React from 'react';

const AddPersonForm = ({ addPerson, newPerson, handleChange }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newPerson.name} onChange={handleChange} id="name" />
    </div>
    <div>
      phone: <input value={newPerson.phone} onChange={handleChange} id="phone" />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default AddPersonForm;
