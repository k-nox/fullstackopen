import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShowResults from './components/ShowResults';

const App = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setResults(response.data);
    });
  }, []);

  useEffect(() => {
    setFilteredResults(
      results.filter((result) => result.name.toLowerCase().includes(search.toLowerCase()))
    );
  }, [results, search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (e) => {
    setSearch(e.target.id);
  };

  return (
    <div>
      <h1>country search</h1>
      <label htmlFor="search">find countries:</label>
      <input
        type="search"
        id="search"
        value={search}
        onChange={handleChange}
        placeholder="country name"
      />
      {<ShowResults results={filteredResults} search={search} handleClick={handleClick} />}
    </div>
  );
};

export default App;
