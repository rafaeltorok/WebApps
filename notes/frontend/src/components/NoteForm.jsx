import { useState } from 'react';
import PropTypes from 'prop-types';

function NoteForm({ createNote }) {
    const [newNote, setNewNote] = useState('')

    const addNote = (event) => {
        event.preventDefault()
        createNote({
          content: newNote,
          important: false
        })
    
        setNewNote('')
    }

    return (
        <div>
            <h2>New note</h2>
            <form onSubmit={addNote}>
                <input 
                    value={newNote}
                    onChange={event => setNewNote(event.target.value)}
                />
                <button type='submit'>save</button>
            </form>
        </div>
    )
}

NoteForm.propTypes = {
    createNote: PropTypes.func.isRequired
}

export default NoteForm