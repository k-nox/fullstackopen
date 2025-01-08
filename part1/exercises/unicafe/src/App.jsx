import { useState } from 'react'
import Header from './Header'
import Button from './Button'
import Statistic from './Statistic'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header text='give feedback'/>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Header text='statistics' />
      <Statistic label='good' count={good} />
      <Statistic label='neutral' count={neutral} />
      <Statistic label='bad' count={bad} />
    </>
  )
}

export default App
