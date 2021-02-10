import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = () => (
  <>
    <h1>Give Feedback:</h1>
  </>
);

const Button = ({ handleClick, label }) => <button onClick={handleClick}>{label}</button>;

const StatsHeader = () => (
  <>
    <h1>Statistics:</h1>
  </>
);

const Stats = ({ label, rating }) => (
  <>
    <p>
      {label}: {rating}
    </p>
  </>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <section>
        <Header />
        <Button handleClick={() => setGood(good + 1)} label="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} label="neutral" />
        <Button handleClick={() => setBad(bad + 1)} label="bad" />
      </section>
      <section>
        <StatsHeader />
        <Stats label="good" rating={good} />
        <Stats label="neutral" rating={neutral} />
        <Stats label="bad" rating={bad} />
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
