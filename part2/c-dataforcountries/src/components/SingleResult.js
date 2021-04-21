import React, { useEffect, useState } from 'react';
import Weather from './Weather';
import axios from 'axios';

const SingleResult = ({ results }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [result] = results;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${result.capital}&appid=${API_KEY}&units=imperial`
      )
      .then((response) => {
        setCurrentWeather(response.data);
      });
  }, [API_KEY, result.capital]);
  return (
    <div>
      <h2>{result.name}</h2>
      <p>capital: {result.capital}</p>
      <p>population: {result.population}</p>
      <h3>languages</h3>
      <ul>
        {result.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={result.flag} alt={`flag of ${result.name}`} width="200px" />
      {currentWeather ? <Weather city={result.capital} currentWeather={currentWeather} /> : null}
    </div>
  );
};

export default SingleResult;
