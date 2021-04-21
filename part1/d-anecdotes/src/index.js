import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ handleClick, label }) => (
  <>
    <button onClick={handleClick}>{label}</button>
  </>
);

const Buttons = ({ handleNextClick, handleVoteClick }) => (
  <>
    <Button handleClick={handleVoteClick} label="Vote" />
    <Button handleClick={handleNextClick} label="Random Anecdore" />
  </>
);

const Section = ({ anecdote, votes, header }) => (
  <section>
    <h1>{header}</h1>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </section>
);

const App = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)));
  };

  const handleVoteClick = () => {
    setPoints(() => {
      const copy = [...points];
      copy[selected] += 1;
      return copy;
    });
  };

  return (
    <div>
      <Section
        anecdote={props.anecdotes[selected]}
        votes={points[selected]}
        header="Anecdote of the day"
      />
      <Buttons handleVoteClick={handleVoteClick} handleNextClick={handleNextClick} />
      <Section
        anecdote={props.anecdotes[points.indexOf(Math.max(...points))]}
        votes={Math.max(...points)}
        header="Anecdote with the most points"
      />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
