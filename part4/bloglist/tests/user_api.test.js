const { TestWatcher } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const initialUsers = [
  {
    _id: "620c46d0e1d96941643f8580",
    username: "user1",
    name: "Dustin",
    passwordHash: "$2b$10$L7ydxixZktHdGu6iWRW6lOFUVX5hzOm/ezEVfCzYkOHo.k57gBcau",
    __v: 0
  },
  {
    _id: "620c4a445c57238bee4d91a1",
    username: "admin",
    name: "Steve",
    passwordHash: "$2b$10$N1pForNpqQbBSn.VFAUWsOoW.x496OJUl/LLZWhEN0Mz1sYL6mZDu",
    __v: 0
  },
  {
    _id: "620c4a605c57238bee4d91a5",
    username: "joe",
    name: "Joe",
    passwordHash: "$2b$10$qp1gXg.wl1I1vdJBdfv90OedAfIcfiYjMzHXZNvFDQNuLHLgDNjve",
    __v: 0
  }
]

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('get users from /api/users', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the right number of users', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('unique identifier is named user', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST to create a new user', () => {
  const newUser = {
    "username": "bill",
    "name": "Bill Smith",
    "password": "1234"
  }

  const newDuplicateUser = {
    "username": "user1",
    "name": "Bill Smith",
    "password": "1234"
  }

  const newShortUsernameUser = {
    "username": "me",
    "name": "Bill Smith",
    "password": "1234"
  }

  const newNoPasswordUser = {
    "username": "bill",
    "name": "Bill Smith",
    "password": ""
  }
  
  test('total number of users increases by one', async () => {
    await api.post('/api/users').send(newUser)
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length + 1)
  })

  test('name matches what was posted', async () => {
    await api.post('/api/users').send(newUser)
    const response = await api.get('/api/users')
    const names = response.body.map(r => r.name)
    expect(names).toContain(newUser.name)
  })

  test('if username is a duplicate, return 400', async () => {
    await api.post('/api/users').send(newDuplicateUser)
      .expect(400)
  })

  test('if username is too short, return 400', async () => {
    await api.post('/api/users').send(newShortUsernameUser)
      .expect(400)
  })

  test('if password is missing, return 400', async () => {
    await api.post('/api/users').send(newNoPasswordUser)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})