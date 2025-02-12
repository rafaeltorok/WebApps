import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'


test('renders the blog title', async () => {
  const blog = {
    title: "Test blog"
  }

  render(<Blog blog={blog} />)

  screen.debug()

  const title = screen.getByText('Test blog')
  expect(title).toBeDefined()
})

test('renders the blog details after clicking the Show button', async () => {
  const blog = {
    title: "Test blog",
    author: "The Tester",
    url: "http://example.com",
    likes: 0,
    user: "Test user"
  }

  render(<Blog blog={blog} />)

  const userInput = userEvent.setup()
  const button = screen.getByText('Show')
  await userInput.click(button)

  screen.debug()

  const title = screen.getByText('Test blog')
  expect(title).toBeDefined()
  const author = screen.getByText('The Tester')
  expect(author).toBeDefined()
  const url = screen.getByText('http://example.com')
  expect(url).toBeDefined()
  const likes = screen.getByText('0')
  expect(likes).toBeDefined()
})

test('checks if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    title: "Test blog",
    author: "The Tester",
    url: "http://example.com",
    likes: 0,
    user: "Test user"
  }

  // Mock function to track like button clicks
  const mockLikeHandler = vi.fn()

  render(<Blog blog={blog} onLike={mockLikeHandler} />)

  const userInput = userEvent.setup()

  // Ensure the blog details are revealed first
  const showButton = screen.getByText('Show')
  await userInput.click(showButton)

  // Find the like button and click it twice
  const likeButton = screen.getByText('like')
  await userInput.click(likeButton)
  await userInput.click(likeButton)

  // Ensure the mock function was called twice
  expect(mockLikeHandler.mock.calls).toHaveLength(2)

  console.log("mockLikeHandler.mock.calls:", mockLikeHandler.mock.calls)
})