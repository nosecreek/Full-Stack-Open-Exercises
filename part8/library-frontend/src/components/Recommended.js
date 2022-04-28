import { useQuery, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { USER, ALL_BOOKS } from '../queries'

const Recommended = (props) => {
  const genreResult = useQuery(USER, { skip: !props.show })

  const [getBooks, { data }] = useLazyQuery(ALL_BOOKS)
  useEffect(() => {
    if (genreResult.data && props.show) {
      getBooks({ variables: { genre: genreResult.data.me.favoriteGenre } })
    }
  }, [genreResult.data, getBooks, props.show])

  if (!props.show) {
    return null
  }
  if (genreResult.loading || !data) {
    return <div>loading...</div>
  }

  const books = data.allBooks
  return (
    <div>
      <h2>books</h2>
      <p>
        books in your favourite genre{' '}
        <strong>{genreResult.data.me.favoriteGenre}</strong>
      </p>
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
    </div>
  )
}

export default Recommended
