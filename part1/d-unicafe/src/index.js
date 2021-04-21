import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = () => (
  <>
    <h1>Give Feedback:</h1>
  </>
);

const Button = ({ handleClick, label }) => <button onClick={handleClick}>{label}</button>;

const Buttons = ({ handleGoodClick, handleNeutralClick, handleBadClick }) => (
  <section>
    <Header />
    <Button handleClick={handleGoodClick} label={'good'} />
    <Button handleClick={handleNeutralClick} label={'neutral'} />
    <Button handleClick={handleBadClick} label={'bad'} />
  </section>
);

const StatsHeader = () => (
  <>
    <h1>Statistics:</h1>
  </>
);

const Statistic = ({ label, stat }) => (
  <tr>
    <td>{label}</td>
    <td>{stat}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad;
  if (totalFeedback > 0) {
    const averageFeedback = (good - bad) / totalFeedback;
    const goodPercentage = `${((good / totalFeedback) * 100).toString(10)}%`;

    return (
      <section>
        <StatsHeader />
        <table>
          <tbody>
            <Statistic label="good" stat={good} />
            <Statistic label="neutral" stat={neutral} />
            <Statistic label="bad" stat={bad} />
            <Statistic label="total feedback" stat={totalFeedback} />
            <Statistic label="average feedback" stat={averageFeedback} />
            <Statistic label="percentage of good feedback" stat={goodPercentage} />
          </tbody>
        </table>
      </section>
    );
  }
  return (
    <section>
      <StatsHeader />
      <p>No feedback given</p>
    </section>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Buttons
        handleGoodClick={() => setGood(good + 1)}
        handleNeutralClick={() => setNeutral(neutral + 1)}
        handleBadClick={() => setBad(bad + 1)}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
