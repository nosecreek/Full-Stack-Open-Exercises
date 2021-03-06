const { TestWatcher } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const userToken =
  'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWQiOiI2MjBjNDZkMGUxZDk2OTQxNjQzZjg1ODAiLCJpYXQiOjE2NDUwNzQ1ODN9.8hbHvyngX13cFkpgQmYwcgu32uEBi_cq2hkgXEAqIoA'
const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Unharmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    user: '620c46d0e1d96941643f8580',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('get blogs from /api/blogs', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the right number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('get an individual blog by id', () => {
  test('note is returned', async () => {
    await api
      .get(`/api/blogs/${initialBlogs[0]._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('error for an invalid blog', async () => {
    await api.get(`/api/blogs/25`).expect(400)
  })
})

describe('POST to create a new blog', () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmfulish',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }

  const newBlogNoLikes = {
    title: 'Go To Statement Considered Harmfulish',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    _id: '5a422bc61b54a676754d17fc'
  }

  const newBlogNoTitle = {
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    _id: '5a422bc61b54a676754d17fc',
    likes: 5
  }

  const newBlogNoURL = {
    title: 'Go To Statement Considered Harmfulish',
    author: 'Edsger W. Dijkstra',
    _id: '5a422bc61b54a676754d17fc',
    likes: 5
  }

  test('total number of blogs increases by one', async () => {
    await api.post('/api/blogs').send(newBlog).set({ Authorization: userToken })
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
  })

  test('title matches what was posted', async () => {
    await api.post('/api/blogs').send(newBlog).set({ Authorization: userToken })
    const response = await api.get('/api/blogs')
    const titles = response.body.map((r) => r.title)
    expect(titles).toContain(newBlog.title)
  })

  test('if likes is empty default to 0', async () => {
    await api
      .post('/api/blogs')
      .send(newBlogNoLikes)
      .set({ Authorization: userToken })
    //const response = await api.get('/api/blogs')
    const newPost = await Blog.findById(newBlogNoLikes._id)
    expect(newPost.toJSON().likes).toEqual(0)
  })

  test('if title is empty, return 400', async () => {
    await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .set({ Authorization: userToken })
      .expect(400)
  })

  test('if url is empty, return 400', async () => {
    await api
      .post('/api/blogs')
      .send(newBlogNoURL)
      .set({ Authorization: userToken })
      .expect(400)
  })

  test('if unauthorized, return 401', async () => {
    await api.post('/api/blogs').send(newBlog).expect(401)
  })
})

describe('delete a blog', () => {
  test('a valid blog is deleted', async () => {
    await api
      .delete('/api/blogs/5a422b891b54a676234d17fa')
      .set({ Authorization: userToken })
      .expect(204)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length - 1)
  })

  test('an invalid blog returns an error', async () => {
    await api
      .delete('/api/blogs/5a432b8951b54a676234d17fa')
      .set({ Authorization: userToken })
      .expect(400)
  })
})

describe('update a blog using a put request', () => {
  const updatedBlog = {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert B. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 11,
    __v: 0
  }

  test('a valid blog is updated', async () => {
    await api.put(`/api/blogs/${updatedBlog._id}`).send(updatedBlog).expect(200)
    const response = await api.get(`/api/blogs/${updatedBlog._id}`)
    expect(response.body.likes).toEqual(updatedBlog.likes)
    expect(response.body.author).toEqual(updatedBlog.author)
  })

  test('an invalid blog returns an error', async () => {
    await api
      .put('/api/blogs/5a432b8491b54a676234d17fa')
      .send(updatedBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
