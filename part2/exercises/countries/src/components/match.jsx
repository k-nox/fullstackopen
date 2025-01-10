const Match = ({ country, weather }) => {
  const languages = Object.keys(country.languages).map((langCode) => (
    <li key={langCode}>{country.languages[langCode]}</li>
  ));

  const flagStyle = {
    fontSize: 200,
  };

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>{languages}</ul>
      <div style={flagStyle}>{country.flag}</div>
      <h2>Weather in {country.capital[0]}</h2>
      {weather === null ? null : (
        <div>
          <p>temperature {weather.main.temp} fahrenheit</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather.description}
          />
          <p>wind {weather.wind.speed} mph</p>
        </div>
      )}
    </div>
  );
};

export default Match;
