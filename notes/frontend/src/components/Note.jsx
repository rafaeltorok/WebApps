import PropTypes from 'prop-types';

function Note({ note, toggleImportance }) {
    const label = note.important
        ? '✗' : '✔';
    
    return (
        <li className='note'>
            <span>{note.content}</span>
            <button className="important-button" onClick={toggleImportance}>{label}</button>
        </li>
    );
}

Note.propTypes = {
    note: PropTypes.shape({
        content: PropTypes.string.isRequired,
        important: PropTypes.bool
    }).isRequired,
    toggleImportance: PropTypes.func.isRequired
}

export default Note;