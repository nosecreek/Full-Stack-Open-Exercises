import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Test that blogs display the correct elements' , () => {
  let container
  const handleLike = jest.fn()

  beforeEach(() => {
    const blog = {
      author: 'Dustin',
      title: 'Test Blog 1',
      url: 'http://www.myblog.com/1',
      likes: 5
    }

    container = render(<Blog blog={blog} handleLike={handleLike} />).container
  })

  test('renders author and title', () => {
    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('Test Blog 1')
    expect(element).toHaveTextContent('Dustin')
  })

  test('does not render url or likes', () => {
    let element = screen.queryByText('myblog.com')
    expect(element).toBeNull()
    element = screen.queryByText('5')
    expect(element).toBeNull()
  })

  test('clicking show displays url and likes', async () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('Test Blog 1')
    expect(element).toHaveTextContent('Dustin')
  })

  test('clicking like calls the event handler', async () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
