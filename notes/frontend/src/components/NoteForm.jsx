import PropTypes from 'prop-types';

function NoteForm({ addNote, newNote, handleNoteChange }) {
    return (
        <form onSubmit={addNote}>
            <input 
                value={newNote}
                onChange={handleNoteChange}
            />
            <button type='submit'>save</button>
        </form>
    )
}

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired,
    newNote: PropTypes.string.isRequired,
    handleNoteChange: PropTypes.func.isRequired
}

export default NoteForm