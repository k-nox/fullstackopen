import { useState, useEffect } from 'react';
import Search from './components/search';
import List from './components/list';
import Match from './components/match';
import axios from 'axios';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const newMatches = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase()),
    );
    setMatches(newMatches);
    if (newMatches.length === 1) {
      setSelected(newMatches[0]);
    } else {
      setSelected(null);
    }
  };

  const handleClick = (country) => {
    setSelected(country);
  };

  return (
    <div>
      <Search value={searchTerm} handleChange={handleChange} />
      {searchTerm !== '' && selected === null ? (
        <List matches={matches} handleClick={handleClick} />
      ) : null}
      {selected !== null ? <Match country={selected} /> : null}
    </div>
  );
};

export default App;
