import React from 'react';
import ResultsList from './ResultsList';
import SingleResult from './SingleResult';

const ShowResults = ({ results, search }) => {
  switch (true) {
    case !search:
      return null;
    case results.length === 0:
      return <p>No results found</p>;
    case results.length === 1:
      return <SingleResult results={results} />;
    case results.length > 10:
      return <p>Too many results, please narrow down your search</p>;
    default:
      return <ResultsList results={results} />;
  }
};

export default ShowResults;
