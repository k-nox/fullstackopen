const Hello = props => {
  return (
    <div>
      <p>Hello {props.name} </p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Maggie'/>
      <Hello name='Biscuit'/>
      <Hello name='Tiny'/>
    </div>
  )
}
export default App