function Person({ person, removePerson }) {
    return <li>{person.name} | {person.number}
                <button className="delete-button" onClick={removePerson}>
                    REMOVE
                </button>
            </li>
}

export default Person;