import { useState, useEffect } from 'react'
import blogListService from './services/blogs'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import './App.css'

function App() {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  useEffect(() => {
        blogListService
          .getAll()
          .then(initialBlogList => {
            setBlogs(initialBlogList)
          })
      }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.trim(),
      author: author.trim(),
      url: url.trim(),
      likes: likes
    }

    blogListService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes(0)
      })
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    setLikes(event.target.value)
  }

  return (
    <>
      <div id='main-page'>
        <h1 className='page-title'>Blogs List</h1>
        <BlogForm 
          addBlog={addBlog}
          handleTitle={handleTitleChange}
          handleAuthor={handleAuthorChange}
          handleUrl={handleUrlChange}
          handleLikes={handleLikesChange}
          title={title}
          author={author}
          url={url}
          likes={likes}
        />
        <h2>List of blogs:</h2>
        <div id='blogs-list'>
          {blogs.map(blog => {
            return <Blog
              key={blog.id}
              blog={blog}
            />
          })}
        </div>
      </div>
    </>
  )
}

export default App