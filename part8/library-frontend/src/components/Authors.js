import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const BirthYear = (props) => {
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const updateYear = async (event) => {
    event.preventDefault();
    console.log(author, year);
    updateAuthor({
      variables: {
        name: author,
        year: parseInt(year),
      },
    });

    setAuthor("");
    setYear("");
  };

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={updateYear}>
        Author Name:
        <br />
        <select
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        >
          <option value=""></option>
          {props.authors.map((a) => (
            <option value={a.name} key={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <br />
        Birth Year:
        <br />
        <input
          type="text"
          value={year}
          onChange={({ target }) => setYear(target.value)}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, { skip: !props.show });
  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYear authors={authors} />
    </div>
  );
};

export default Authors;
