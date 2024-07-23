import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders title and author, but not URL or likes by default', () => {
  const blog = {
    title: 'test example',
    author: 'tester',
    url: 'example.com',
    likes: 5,
    user: {
      username: 'test'
    }
  }

  const user = {
    username: 'test'
  }

  render(<Blog blog={blog} user={user} />)

  const title = screen.getByText((content, element) =>
    element.tagName.toLowerCase() === 'div' && content.includes('test example')
  )
  const author = screen.getByText((content, element) =>
    element.tagName.toLowerCase() === 'div' && content.includes('tester')
  )

  expect(title).toBeInTheDocument()
  expect(author).toBeInTheDocument()

  const url = screen.queryByText('example.com')
  const likes = screen.queryByText('likes 5')

  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('renders title, author, URL, and likes when the view button is clicked', async () => {
  const blog = {
    title: 'test example',
    author: 'tester',
    url: 'example.com',
    likes: 5,
    user: {
      username: 'test'
    }
  }

  const user = {
    username: 'test'
  }

  render(<Blog blog={blog} user={user} />)

  const userAction = userEvent.setup()
  const button = screen.getByText('view')
  await userAction.click(button)

  // Check that URL and likes are rendered after clicking the button
  const url = screen.getByText('example.com')
  const likes = screen.getByText('likes 5')

  expect(url).toBeInTheDocument()
  expect(likes).toBeInTheDocument()
})

// test('when like button is clicked twice', async () => {
//   const blog = {
//     title: 'test example',
//     author: 'tester',
//     url: 'example.com',
//     likes: 5,
//     user: {
//       username: 'test'
//     }
//   }

//   const user = {
//     username: 'test'
//   }

//   const mockHandler = vi.fn()

//   render(<Blog blog={blog} user={user} handleLike={mockHandler} />)

//   const userAction = userEvent.setup()
//   const viewButton = screen.getByText('view')
//   await userAction.click(viewButton)

//   const likeButton = screen.getByText('like')
//   await userAction.click(likeButton)
//   await userAction.click(likeButton)

//   expect(mockHandler).toHaveBeenCalledTimes(2)
// })
