import PropTypes from 'prop-types';

function Blog({ blog, onLike }) {
    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={2} className="blog-title">{blog.title}</th>
                </tr>
            </thead>
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
            </tbody>
        </table>
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
    onLike: PropTypes.func.isRequired
}

export default Blog