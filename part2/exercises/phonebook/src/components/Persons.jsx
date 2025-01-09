import Person from './Person';
const Persons = ({ persons, nameFilter, handleDelete }) => {
  const filteredPersons =
    nameFilter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(nameFilter.toLowerCase()),
        );

  const names = filteredPersons.map((person) => (
    <Person key={person.id} person={person} handleClick={handleDelete} />
  ));

  return <ul>{names}</ul>;
};
export default Persons;
