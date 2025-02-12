import { test, vi, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NoteForm from '../components/NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

  // const input = screen.getByRole('textbox') // When a placeholder is not available
  const input = screen.getByPlaceholderText('write note content here')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  screen.debug()

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
  console.log("createNote.mock.calls :", createNote.mock.calls)
})