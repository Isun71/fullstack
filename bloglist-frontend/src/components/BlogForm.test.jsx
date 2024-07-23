import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('when a new blog is created', async () => {
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const user = userEvent.setup()

  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'test example')
  await user.type(authorInput, 'tester')
  await user.type(urlInput, 'example.com')
  await user.click(createButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'test example',
    author: 'tester',
    url: 'example.com'
  })
})