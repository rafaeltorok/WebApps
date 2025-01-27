function Note({ note, toggleImportance }) {
    const label = note.important
        ? '✗' : '✔';
    
    return (
        <li>
            {note.content}
            <button className="important-button" onClick={toggleImportance}>{label}</button>
        </li>
    );
}

export default Note;