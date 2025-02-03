function Contact({ contact, removeContact }) {
    return <li>{contact.name} | {contact.number}
                <button className="delete-button" onClick={removeContact}>
                    REMOVE
                </button>
            </li>
}

export default Contact;