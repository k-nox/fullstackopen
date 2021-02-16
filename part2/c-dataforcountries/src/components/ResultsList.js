import React from 'react';

const ResultsList = ({ results }) => {
  return (
    <ul>
      {results.map((result) => (
        <li key={result.name}>{result.name}</li>
      ))}
    </ul>
  );
};

export default ResultsList;
