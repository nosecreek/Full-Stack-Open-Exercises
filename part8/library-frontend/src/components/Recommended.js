import { useQuery } from '@apollo/client'
import { USER, ALL_BOOKS } from '../queries'

const Recommended = (props) => {
  const genreResult = useQuery(USER, { skip: !props.show })
  const booksResult = useQuery(ALL_BOOKS, { skip: !props.show })
  if (!props.show) {
    return null
  }
  if (genreResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }
  const books = booksResult.data.allBooks.filter((b) =>
    b.genres.includes(genreResult.data.me.favoriteGenre)
  )
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
