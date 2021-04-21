import React from 'react';

const ResultsList = ({ results, handleClick }) => {
  return (
    <ul>
      {results.map((result) => (
        <li key={result.alpha2Code}>
          {result.name}
          <button id={result.name} type="button" onClick={handleClick}>
            show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ResultsList;
