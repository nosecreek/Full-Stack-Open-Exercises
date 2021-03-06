import React, { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  
  let largestVote = 0
  let largestIndex = 0
  
  const Vote = () => {
    let newPoints = {...points}
    newPoints[selected] += 1
    setPoints(newPoints)
  }
  
  //calculate the most votes
  for(let x in points) {
    if(points[x] > largestVote) {
      largestVote = points[x]
      largestIndex = x
    }
  }

  return (
    <div>
      <h2>Annecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} Votes</p>
      <Button text="Vote" handleClick={() => Vote()} />
      <Button text="Next Anecdote" handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} />
      <h2>Annecdote with the most votes</h2>
      <p>{anecdotes[largestIndex]}</p>
    </div>
  )
}

export default App