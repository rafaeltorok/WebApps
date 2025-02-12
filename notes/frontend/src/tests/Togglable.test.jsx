import { test, expect, beforeEach, describe } from 'vitest';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from '../components/Togglable';


describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    screen.debug()
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    screen.debug()
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    screen.debug()

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    screen.debug()

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})