import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS, { skip: !props.show })
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const books = genre
    ? result.data.allBooks.filter((b) => b.genres.includes(genre))
    : result.data.allBooks
  let genres = []
  result.data.allBooks.forEach((b) => {
    b.genres.forEach((g) => {
      if (!genres.includes(g)) {
        genres.push(g)
      }
    })
  })

  return (
    <div>
      <h2>books</h2>
      {genre ? (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      ) : null}
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button onClick={() => setGenre(g)} key={g}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre('')}>show all</button>
      </div>
    </div>
  )
}

export default Books
