import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(({ filter }) => filter)
  const anecdotes = useSelector(({ anecdotes }) => [...anecdotes].filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1))
  anecdotes.sort((a,b) => b.votes - a.votes )
  const dispatch = useDispatch()
  const voteFor = (id) => {
    dispatch(vote(id))
    dispatch(setNotification(`You voted for '${anecdotes.find(a => a.id === id).content}'`, 5))
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