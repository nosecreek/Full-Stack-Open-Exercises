import { useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const [getBooks, { data: books }] = useLazyQuery(ALL_BOOKS)
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (props.show) {
      getBooks()
    }
  }, [getBooks, props.show])

  useEffect(() => {
    if (genres.length === 0 && books) {
      let gs = []
      books.allBooks.forEach((b) => {
        b.genres.forEach((g) => {
          if (!gs.includes(g)) {
            gs.push(g)
          }
        })
      })
      setGenres(gs)
    }
  }, [books]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (!books) {
    return <div>loading...</div>
  }

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
          {books.allBooks.map((a) => (
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
          <button
            onClick={() => {
              getBooks({ variables: { genre: g } })
              setGenre(g)
            }}
            key={g}
          >
            {g}
          </button>
        ))}
        <button
          onClick={async () => {
            await getBooks({ variables: { genre: '' } })
            setGenre('')
          }}
        >
          show all
        </button>
      </div>
    </div>
  )
}

export default Books
