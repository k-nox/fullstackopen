const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = 'Biscuit'
  const age = 2
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maggie" age={1 + 2} />
      <Hello name={name} age={age} />
      <Hello name="Tiny" age={1} />
    </div>
  )
}

export default App
