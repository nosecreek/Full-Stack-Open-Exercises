import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders author and title', () => {
  const blog = {
    author: 'Dustin',
    title: 'Test Blog 1',
    url: 'http://www.myblog.com/1',
    likes: 5
  }

  const { container } = render(<Blog blog={blog} />)
  const element = container.querySelector('.blog')
  expect(element).toHaveTextContent('Test Blog 1')
  expect(element).toHaveTextContent('Dustin')
})

test('does not render url or likes', () => {
  const blog = {
    author: 'Dustin',
    title: 'Test Blog 1',
    url: 'http://www.myblog.com/1',
    likes: 5
  }

  const { container } = render(<Blog blog={blog} />)
  let element = screen.queryByText('myblog.com')
  expect(element).toBeNull()
  element = screen.queryByText('5')
  expect(element).toBeNull()
})