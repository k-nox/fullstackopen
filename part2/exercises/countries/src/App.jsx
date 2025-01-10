import { useState, useEffect } from 'react';
import Search from './components/search';
import List from './components/list';
import Match from './components/match';
import countryService from './services/countries';
import weatherService from './services/weather.js';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selected, setSelected] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService.getAll().then((countries) => setCountries(countries));
  }, []);

  const selectCountry = (country) => {
    setSelected(country);
    if (country === null) {
      setWeather(null);
    } else if (country !== selected) {
      weatherService
        .weather(country.capital[0], country.cca2)
        .then((weather) => setWeather(weather));
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const newMatches = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase()),
    );
    setMatches(newMatches);
    if (newMatches.length === 1) {
      selectCountry(newMatches[0]);
    } else {
      selectCountry(null);
    }
  };

  const handleClick = (country) => {
    selectCountry(country);
  };

  return (
    <div>
      <Search value={searchTerm} handleChange={handleChange} />
      {searchTerm !== '' && selected === null ? (
        <List matches={matches} handleClick={handleClick} />
      ) : null}
      {selected !== null ? (
        <Match country={selected} weather={weather} />
      ) : null}
    </div>
  );
};

export default App;
