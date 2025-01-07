const Hello = ({ name, age }) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Biscuit'
  const age = 3
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maggie" age={1 + 3} />
      <Hello name={name} age={age} />
      <Hello name="Tiny" age={2} />
    </div>
  )
}

export default App
