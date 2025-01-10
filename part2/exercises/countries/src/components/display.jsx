import Match from './match';

const Display = ({ matches }) => {
  if (matches.length === 0) {
    return <div>No matches found, specify another filter</div>;
  }
  if (matches.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (matches.length > 1) {
    const countries = matches.map((match) => (
      <p key={match.cca2}>{match.name.common}</p>
    ));
    return <div>{countries}</div>;
  }

  return <Match country={matches[0]} />;
};

export default Display;
