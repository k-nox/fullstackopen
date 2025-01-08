const Anecdote = ({anecdote, voteCount}) => {
  return (
    <>
        <p>{anecdote}</p>
        <p>has {voteCount} votes</p>
    </>
  )
}
export default Anecdote