import PropTypes from 'prop-types';

function Blog({ blog }) {
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
                    <td>{blog.likes}</td>
                </tr>
            </tbody>
        </table>
    )
}

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired, // Or PropTypes.number if likes is optional
    }).isRequired
}

export default Blog