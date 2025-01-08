import Person from './Person';
const Persons = ({ persons, nameFilter }) => {
  const filteredPersons =
    nameFilter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(nameFilter.toLowerCase()),
        );

  const names = filteredPersons.map((person) => (
    <Person key={person.name} person={person} />
  ));

  return <ul>{names}</ul>;
};
export default Persons;
