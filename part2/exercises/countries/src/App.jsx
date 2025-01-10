import { useState, useEffect } from 'react';
import Search from './components/search';
import Display from './components/display';
import axios from 'axios';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setMatches(
      countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase()),
      ),
    );
  };

  return (
    <div>
      <Search value={searchTerm} handleChange={handleChange} />
      {searchTerm === '' ? null : <Display matches={matches} />}
    </div>
  );
};

export default App;
