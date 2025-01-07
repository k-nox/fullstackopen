const Hello = props => {
  return (
    <p>
      Hello {props.name}, you are {props.age} years old
    </p>
  )
}

const App = () => {
  const cats = [
    { name: 'Maggie', age: 3 },
    { name: 'Biscuit', age: 2 },
    { name: 'Tiny', age: 1 },
  ]
  return (
    <>
      <h1>Greetings</h1>
      {cats.map((cat, index) => <Hello name={cat.name} age={cat.age} key={index} />)}
    </>
  )
}
export default App