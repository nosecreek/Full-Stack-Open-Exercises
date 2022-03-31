import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(({ filter }) => filter)
  const anecdotes = useSelector(({ anecdotes }) => [...anecdotes].filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1))
  anecdotes.sort((a,b) => b.votes - a.votes )
  const dispatch = useDispatch()
  console.log(anecdotes)
  const voteFor = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
    dispatch(setNotification(`You voted for '${anecdotes.find(a => a.id === id).content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteFor(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList