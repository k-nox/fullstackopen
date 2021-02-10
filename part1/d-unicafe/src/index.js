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

const Stats = ({ label, stat }) => (
  <>
    <p>
      {label}: {stat}
    </p>
  </>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedback = good + neutral + bad;
  const averageFeedback = totalFeedback > 0 ? (good - bad) / totalFeedback : 0;
  const goodPercentage =
    totalFeedback > 0 ? `${((good / totalFeedback) * 100).toString(10)}%` : '0%';

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
        <Stats label="good" stat={good} />
        <Stats label="neutral" stat={neutral} />
        <Stats label="bad" stat={bad} />
        <Stats label="total feedback" stat={totalFeedback} />
        <Stats label="average feedback" stat={averageFeedback} />
        <Stats label="percentage of good feedback" stat={goodPercentage} />
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
