const Match = ({ country }) => {
  const languages = Object.keys(country.languages).map((langCode) => (
    <li key={langCode}>{country.languages[langCode]}</li>
  ));

  const flagStyle = {
    fontSize: 200,
  };

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>{languages}</ul>
      <div style={flagStyle}>{country.flag}</div>
    </div>
  );
};

export default Match;
