import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    updateLikes(returnedBlog)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title}, {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
          <p>added by {blog.user && blog.user.name}</p>
        </div>
      )}
      {visible && user.username === blog.user.username && (
        <button onClick={handleDelete}>remove</button>
      )}
    </div>
  )
}

export default Blog