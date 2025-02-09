import { useState, useEffect } from 'react'
import blogListService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import loginService from './services/login'
import './App.css'

function App() {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogListService
      .getAll()
      .then(initialBlogList => {
        setBlogs(initialBlogList)
      })
  }, [])

  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogListService.setToken(user.token)
      }
    }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedBlogListAppUser', JSON.stringify(user)
      )
      blogListService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.warn("Login failed:", exception);
      alert('Wrong credentials')
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.trim(),
      author: author.trim(),
      url: url.trim(),
      likes: likes,
      user: user
    }

    try {
      const returnedBlog = await blogListService.create(newBlog)
      setBlogs(blogs.concat({ ...returnedBlog, user }))
      alert(`The blog "${title}" by ${author} has been added!`)
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes(0)
    } catch (exception) {
      console.error("Error adding blog:", exception)
    }
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

  const loginForm = () => {
      return (
        <LoginForm 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )
    }
  
    const blogForm = () => {
      return (
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
      )
    }
  
    const logout = () => {
      window.localStorage.removeItem('loggedBlogListAppUser')
      // Reload the page
      window.location.reload();
    }

  return (
    <>
      <div id='main-page'>
        <h1 className='page-title'>Blogs List</h1>
        
        {user === null ?
          loginForm() :
          <div>
            <p id='logged-field'>
              Logged in as <span id='logged-username'>{user.name}</span>
              <button id='logout-button' onClick={logout}>logout</button>
            </p>
            {blogForm()}
          </div>
        }

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