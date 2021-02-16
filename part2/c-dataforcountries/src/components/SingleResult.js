import React from 'react';

const SingleResult = ({ results }) => {
  const [result] = results;
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
    </div>
  );
};

export default SingleResult;
