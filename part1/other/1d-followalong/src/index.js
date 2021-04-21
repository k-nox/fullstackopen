import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const History = props => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(' ')}</div>;
};

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const Display = ({ side }) => (
  <>
    <span>{side}</span>
  </>
);

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleClick = (side, letter, func) => {
    setAll(allClicks.concat(letter));
    func(side + 1);
  };

  return (
    <div>
      <Display side={left} />
      <Button handleClick={() => handleClick(left, 'L', setLeft)} text="left" />
      <Button handleClick={() => handleClick(right, 'R', setRight)} text="right" />
      <Display side={right} />
      <History allClicks={allClicks} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
