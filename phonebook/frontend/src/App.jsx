import { useState, useEffect, useRef } from 'react';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import Contact from './components/Contact';
import Notification from './components/Notification';
import phoneBookService from './services/contacts';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [message, setMessage] = useState('');
  const [typeOfMessage, setTypeOfMessage] = useState('success-message');
  const timeoutRef = useRef(null); // Store the timeout reference

  useEffect(() => {
      phoneBookService
        .getAll()
        .then(initialContacts => {
          setContacts(initialContacts);
        });
    }, []);

  const addContact = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName.trim(),
      number: newNumber.trim()
    };

    const numberTest = /^\d{2,3}-\d+$/

    if (newContact.name === '' || newContact.number === '') {
      handleMessage(`Both fields must be filled`, 'error-message');
    } else if (contacts.some(contact => 
                contact.name.toLowerCase() === newContact.name.toLowerCase()
                && contact.number === newContact.number
              )) {
      handleMessage(`"${newContact.name}" has already been added to the PhoneBook`, 'error-message');
    } else if (contacts.some(contact => 
                contact.name.toLowerCase() === newContact.name.toLowerCase()
                && contact.number !== newContact.number && numberTest.test(newContact.number)
    )) {
      const contactToUpdate = contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase());
      updateNumber(contactToUpdate.id, newContact);
    } else if (newContact.name.length < 3) {
      handleMessage("The contact's name must be at least 3 chars long", 'error-message')
    } else if (newContact.number.length < 9) {
      handleMessage("The contact's number must have at least 8 digits", 'error-message')
    } else if (!numberTest.test(newContact.number)) {
      handleMessage(`${newContact.number} is invalid, please use a format like XX-XXXXXXX or XXX-XXXXXXXX`, 'error-message')
    } else {
      phoneBookService
        .create(newContact)
        .then(returnedContact => {
          setContacts(contacts.concat(returnedContact));
          setNewName('');
          setNewNumber('');
      });
      handleMessage(`Added ${newContact.name} to the PhoneBook`, 'success-message');
    }
  };

  const removeContact = contact => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      phoneBookService
        .deleteContact(contact)
        .then(() => {
          setContacts(contacts.filter(c => c.id !== contact.id));
          handleMessage(`${contact.name} has been removed from the PhoneBook`, 'success-message');
        })
        .catch(() => {
          handleMessage(`Failed to remove ${contact.name}`, 'error-message');
        });
    }
  };

  const updateNumber = (id, contact) => {
    const updatedContact = {id: id, ...contact}
    if (window.confirm(`${updatedContact.name} is already on the PhoneBook, replace his old number with a new one?`)) {
      phoneBookService
        .update(id, updatedContact)
        .then(() => {
          setContacts(contacts.map(c => c.id !== id ? c : { id: id, name: c.name, number: updatedContact.number }));
          handleMessage(`${updatedContact.name}'s number has been changed`, 'success-message');
        })
        .catch(() => {
          handleMessage(`Information about "${updatedContact.name}" has already been removed from the PhoneBook`, 'error-message');
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  }

  const contactsToShow = (searchName.trim() !== '') 
    ? contacts.filter(contact => contact.name.toLowerCase().includes(searchName.trim().toLowerCase()))
    : contacts;

  const handleMessage = (messageContent, typeOf) => {
    setMessage(messageContent);
    setTypeOfMessage(typeOf);

    // Clear existing timeout before setting a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout and store the reference
    timeoutRef.current = setTimeout(() => {
      setMessage(null);
    }, 10000);
  }

  return (
    <>
      <div id='main-app'>
        <h1 id='page-title'>PhoneBook</h1>
        <Notification message={message} typeOf={typeOfMessage}/>
        <Filter callback={handleSearchName}/>
        <h2>Add new contact</h2>
        <ContactForm functions={{
          addContact: addContact, 
          newName: newName, 
          newNumber: newNumber, 
          handleNameChange: handleNameChange, 
          handleNumberChange: handleNumberChange
        }}/>
        <h2>Contacts</h2>
        <div className='contacts-list'>
          <ul>
            {contactsToShow.map(contact => (
              <Contact 
                key={contact.id} 
                contact={contact} 
                removeContact={() => removeContact(contact)}
              />
            ))}
          </ul>
        </div>
      </div>
      <div>debug: {newName} | {newNumber}</div>
    </>
  );
}

export default App;