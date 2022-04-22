const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/authors')
const Book = require('./models/books')
require('dotenv').config()

console.log('connecting to', process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('DB connection error:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]
    id: ID!
  }
  type Author {
    name: String!
    id: ID!
    bookCount: Int!
    born: Int
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    addAuthor(name: String!): Author
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // let theBooks = args.author
      //   ? books.filter((b) => b.author === args.author)
      //   : books
      // theBooks = args.genre
      //   ? theBooks.filter((b) => b.genres.includes(args.genre))
      //   : theBooks
      return Book.find({})
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({
        author: root._id
      })
      return books.length
    }
  },
  Book: {
    author: async (root) => Author.findById(root.author)
  },
  Mutation: {
    addBook: async (root, args) => {
      // const book = { ...args, id: uuid() }
      // books = books.concat(book)
      // if (!authors.find((a) => a.name === args.author)) {
      //   authors = authors.concat({ name: args.author, id: uuid() })
      // }
      let author = await Author.findOne({ name: args.author })
      author = author ? author : await new Author({ name: args.author }).save()
      const book = new Book({ ...args, author: author })
      return book.save()
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      // authors = authors.concat(book)
      return author.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      const newAuthor = { name: author.name, born: args.setBornTo }
      return await Author.findByIdAndUpdate(author.id, newAuthor, {
        new: true,
        runValidators: true
      })
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
