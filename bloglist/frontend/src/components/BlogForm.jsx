import PropTypes from 'prop-types';

function BlogForm({ addBlog, handleTitle, handleAuthor, handleUrl, handleLikes, title, author, url, likes }) {
    return (
        <form onSubmit={addBlog}>
            <table className="input-table">
                <thead>
                    <tr>
                        <th className="table-title" colSpan={2}>Add new blog</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <label htmlFor="title-field">Title</label>
                        </th>
                        <td>
                            <input 
                                type="text"
                                id="title-field"
                                name="title-field"
                                value={title}
                                onChange={handleTitle}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="author-field">Author</label>
                        </th>
                        <td>
                            <input
                                type="text"
                                id="author-field"
                                name="author-field"
                                value={author}
                                onChange={handleAuthor}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="url-field">URL</label>
                        </th>
                        <td>
                            <input
                                type="text"
                                id="url-field"
                                name="url-field"
                                value={url}
                                onChange={handleUrl}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="likes-field">Likes</label>
                        </th>
                        <td>
                            <input
                                type="number"
                                id="likes-field"
                                name="likes-field"
                                value={likes}
                                onChange={handleLikes}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th colSpan={2}>
                            <button id="table-submit-button" type="submit">SUBMIT</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
    handleTitle: PropTypes.func.isRequired,
    handleAuthor: PropTypes.func.isRequired,
    handleUrl: PropTypes.func.isRequired,
    handleLikes: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired, // Or PropTypes.number if likes is optional
}

export default BlogForm