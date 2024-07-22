import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const input = container.querySelector('#blog-title-input')

  // const input = screen.getAllByRole('textbox') // error occurs since there are multiple textboxes
  // const input = screen.getByPlaceholderText('write title of blog')
  const sendButton = screen.findByText('create')

  await user.type(input[0], 'testing a form...')
  await user.click(sendButton)

  console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
})