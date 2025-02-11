import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Blog({ blog, onLike, showAll, removeBlog }) {
  const [showBody, setShowBody] = useState(false)

  // Sync individual state with global "Show All" toggle
  useEffect(() => {
    setShowBody(showAll);
  }, [showAll])

  return (
    <div className='table-division'>
      <table>
        <thead>
          <tr>
            <th colSpan={2} className="blog-title">{blog.title}</th>
          </tr>
          <tr>
            <th colSpan={2}>
              <button
                onClick={() => setShowBody(!showBody)}
              >
                {showBody ? "Hide" : "Show"}
              </button>
            </th>
          </tr>
        </thead>
        {showBody && (
          <tbody>
            <tr>
              <th>Author</th>
              <td>{blog.author}</td>
            </tr>
            <tr>
              <th>URL</th>
              <td>
                <a href="{blog.url}" target="_blank" rel="noopener noreferrer">
                  {blog.url}
                </a>
              </td>
            </tr>
            <tr>
              <th>Likes</th>
              <td>
                {blog.likes}
                <button className='like-button' onClick={() => onLike(blog.id)}>like</button>
              </td>
            </tr>
            <tr>
              <th>User</th>
              <td>{blog.user.name}</td>
            </tr>
            <tr>
              <th colSpan={2}>
                <button onClick={() => removeBlog(blog)}>
                    REMOVE
                </button>
              </th>
            </tr>
          </tbody>
        )}
      </table>
    </div>      
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired, // Or PropTypes.number if likes is optional
    user: PropTypes.object.isRequired
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  showAll: PropTypes.bool.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog