import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn() // Mock function
  const user = userEvent.setup()

  // Render the BlogForm component
  render(<BlogForm createBlog={createBlog} />)

  // Get all input fields
  const titleInput = screen.getByLabelText(/Title/i)
  const authorInput = screen.getByLabelText(/Author/i)
  const urlInput = screen.getByLabelText(/URL/i)
  const submitButton = screen.getByText('SUBMIT')

  // Fill out the form
  await user.type(titleInput, 'Testing Blog Title')
  await user.type(authorInput, 'Random User')
  await user.type(urlInput, 'http://example.com')

  // Submit the form
  await user.click(submitButton)

  // Ensure createBlog was called once
  expect(createBlog.mock.calls).toHaveLength(1)

  // Check that createBlog was called with the correct data
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing Blog Title',
    author: 'Random User',
    url: 'http://example.com',
    likes: 0, // Default likes value from BlogForm
  })

  console.log('createBlog.mock.calls:', createBlog.mock.calls)

  // Debug the output (optional)
  screen.debug()
})
