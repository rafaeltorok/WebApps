import { useState, useEffect, useRef } from 'react'
import blogListService from './services/blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import loginService from './services/login'
import './App.css'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) // Holds the data of the currently logged user
  const [loginVisible, setLoginVisible] = useState(false) // Defines if the login form should be displayed
  const [showAll, setShowAll] = useState(false) // Controls the visibility of all tables

  const blogFormRef = useRef()

  // This avoids modifying blogs directly and ensures sorting doesn't happen unnecessarily on every re-render
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

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

  const addBlog = (blogObject) => {
    if (!blogObject.title ||
        !blogObject.author ||
        !blogObject.url
    ) {
      alert('Please, fill out all fields')
      return
    }

    blogListService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat({ ...returnedBlog, user }))
        blogFormRef.current.toggleVisibility()
        alert(`The blog "${returnedBlog.title}" by ${returnedBlog.author} has been added!`)
      })
      .catch (exception => {
        alert('Failed to add blog')
        console.error("Error adding blog:", exception)
      })
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleLike = async (id) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)

    if (!blogToUpdate) {
      console.error(`Blog with id ${id} not found`);
      return; // Exit the function if blog is not found
    }

    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

    blogListService
      .update(updatedBlog)
      .then(returnedBlog => {
        // Ensure the user object is preserved
        setBlogs(blogs.map(blog => blog.id === id ? { ...returnedBlog, user: blogToUpdate.user } : blog))
      })
      .catch (exception => {
        console.error("Error liking the blog:", exception)
      })
  }

  const removeBlog = blog => {
    if (window.confirm(`Remove ${blog.title} from ${blog.author}?`)) {
      blogListService
        .remove(blog)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
          alert("The blog has been removed from the list")
        })
        .catch(() => {
          alert("Failed to remove blog")
        })
    }
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
            <p className='logged-field'>
              Logged in as <span id='logged-username'>{user.name}</span>
              <button id='logout-button' onClick={logout}>logout</button>
            </p>
            <Togglable buttonLabel="add blog" ref={blogFormRef}>
              <BlogForm
                createBlog={addBlog}
              />
            </Togglable>
          </div>
        }

        {user === null ?
          <h2 className='logged-field'>Login to see the blogs list</h2> :
          <div>
            <h2>List of blogs:</h2>
            <button
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Hide All" : "Show All"}
            </button>
            <div id='blogs-list'>
              {sortedBlogs.map(blog => {
                return <Blog
                  key={blog.id}
                  blog={blog}
                  onLike={handleLike}
                  showAll={showAll}
                  removeBlog={removeBlog}
                />
              })}
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default App