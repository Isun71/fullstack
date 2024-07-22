import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'anonymous tester',
    url: 'testing.url'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')

  screen.debug(element)

  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'anonymous tester',
    url: 'testing.url'
  }
  
  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} toggleImportance={mockHandler} /> // tbr
  )

  const user = userEvent.setup()
  const button = screen.getByText('make not important') // tbr
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('does not render this', () => {
  const blog = {
    title: 'This is a reminder',
    author: 'miss remind',
    url: "remind.me"
  }

  render(<Blog blog={blog} />)

  const element = screen.queryByText('do not want this thing to be rendered')
  expect(element).toBeNull()
})