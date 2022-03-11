import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

describe('Creating a new blog' , () => {
  let container
  const createBlog = jest.fn()
  const setMessage = jest.fn()
  const setBlogs = jest.fn()
  const newBlogRef = { 'current': { 'toggleVisibility': jest.fn() } }

  beforeEach(() => {
    container = render(<NewBlog blogs={[]} createBlog={createBlog} setMessage={setMessage} setBlogs={setBlogs} newBlogRef={newBlogRef} />).container
  })

  test('creating a new blog fires the correct event', async () => {
    const button = screen.getByText('Submit')
    userEvent.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
  })

  test('creating a new blog passes the correct content', async () => {
    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const url = container.querySelector('.url')

    userEvent.type(title, 'A Blog')
    userEvent.type(author, 'Dustin')
    userEvent.type(url, 'thissite.com')

    const button = screen.getByText('Submit')
    userEvent.click(button)

    await waitFor(() => {
      expect(createBlog.mock.calls[0][0].title).toBe('A Blog')
      expect(createBlog.mock.calls[0][0].author).toBe('Dustin')
      expect(createBlog.mock.calls[0][0].url).toBe('thissite.com')
    })

  })
})
