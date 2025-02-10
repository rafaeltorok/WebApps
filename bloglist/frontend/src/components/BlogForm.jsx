import { useState } from 'react';
import PropTypes from 'prop-types';

function BlogForm({ createBlog }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title.trim(),
            author: author.trim(),
            url: url.trim(),
            likes: 0,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

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
                                onChange={event => setTitle(event.target.value)}
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
                                onChange={event => setAuthor(event.target.value)}
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
                                onChange={event => setUrl(event.target.value)}
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
    createBlog: PropTypes.func.isRequired
}

export default BlogForm