const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError
} = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/authors')
const Book = require('./models/books')
const User = require('./models/user')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filters = {}
      if (args.genre) {
        filters.genres = args.genre
      }
      // if (args.author) {
      //   filters.author.name = author.genre
      // }
      return Book.find(filters)
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
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
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not logged in')
      }

      if (args.title.length < 4) {
        throw new UserInputError('Title must be at least 4 characters long')
      }

      let author = await Author.findOne({ name: args.author })

      try {
        author = author
          ? author
          : await new Author({ name: args.author }).save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      const book = new Book({ ...args, author: author })
      try {
        await book.save()
      } catch (error) {
        console.log('error')
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return book
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      // authors = authors.concat(book)
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not logged in')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      const newAuthor = { name: author.name, born: args.setBornTo }
      try {
        await Author.findByIdAndUpdate(author.id, newAuthor, {
          new: true,
          runValidators: true
        })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return newAuthor
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'password') {
        throw new UserInputError('wrong username or password')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
