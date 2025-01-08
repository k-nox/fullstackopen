import { useState } from 'react'
import History from './History'
import Button from './Button'

function App() {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAllClicks] = useState([])
  const [total, setTotal] = useState(0)

  const handleClick = (value, setValue, otherValue, label) => () => {
    setAllClicks(allClicks.concat(label))
    const updatedValue = value + 1
    setValue(updatedValue)
    setTotal(updatedValue + otherValue)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleClick(left, setLeft, right, 'L')} text='left'/>
      <Button handleClick={handleClick(right, setRight, left, 'R')} text='right'/>
      {right}
      <History allClicks={allClicks} />
      <p>total {total}</p>
    </div>
  )
}

export default App
