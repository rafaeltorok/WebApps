import PropTypes from 'prop-types';

function NoteForm({ addNote, noteContent, handleNoteChange }) {
    return (
        <form onSubmit={addNote}>
            <input 
                value={noteContent}
                onChange={handleNoteChange}
            />
            <button type='submit'>save</button>
        </form>
    )
}

NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired,
    noteContent: PropTypes.string.isRequired,
    handleNoteChange: PropTypes.func.isRequired
}

export default NoteForm