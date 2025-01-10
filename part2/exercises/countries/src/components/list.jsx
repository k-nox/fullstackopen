const List = ({ matches, handleClick }) => {
  if (matches.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (matches.length > 1) {
    const countries = matches.map((match) => (
      <div key={match.cca2}>
        {match.name.common}{' '}
        <button onClick={() => handleClick(match)}>Show</button>
      </div>
    ));
    return <div>{countries}</div>;
  }

  return <div>No matches found, try another filter</div>;
};

export default List;
