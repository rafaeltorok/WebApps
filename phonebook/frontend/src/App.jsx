import { useState, useEffect, useRef } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import Notification from './components/Notification';
import phoneBookService from './services/persons';
import './App.css';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [message, setMessage] = useState('');
  const [typeOfMessage, setTypeOfMessage] = useState('success-message');
  const timeoutRef = useRef(null); // Store the timeout reference

  useEffect(() => {
      phoneBookService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons);
        });
    }, []);

  const addContact = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim()
    };

    const numberTest = /^\d{2,3}-\d+$/

    if (newPerson.name === '' || newPerson.number === '') {
      handleMessage(`Both fields must be filled`, 'error-message');
    } else if (persons.some(person => 
                person.name.toLowerCase() === newPerson.name.toLowerCase()
                && person.number === newPerson.number
              )) {
      handleMessage(`"${newPerson.name}" has already been added to the PhoneBook`, 'error-message');
    } else if (persons.some(person => 
                person.name.toLowerCase() === newPerson.name.toLowerCase()
                && person.number !== newPerson.number && numberTest.test(newPerson.number)
    )) {
      const personToUpdate = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase());
      updateNumber(personToUpdate.id, newPerson);
    } else if (newPerson.name.length < 3) {
      handleMessage("The contact's name must be at least 3 chars long", 'error-message')
    } else if (newPerson.number.length < 9) {
      handleMessage("The contact's number must have at least 8 digits", 'error-message')
    } else if (!numberTest.test(newPerson.number)) {
      handleMessage(`${newPerson.number} is invalid, please use a format like XX-XXXXXXX or XXX-XXXXXXXX`, 'error-message')
    } else {
      phoneBookService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
      });
      handleMessage(`Added ${newPerson.name} to the PhoneBook`, 'success-message');
    }
  };

  const removePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneBookService
        .deletePerson(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id));
          handleMessage(`${person.name} has been removed from the PhoneBook`, 'success-message');
        })
        .catch(error => {
          handleMessage(`Failed to remove ${person.name}`, 'error-message');
        });
    }
  };

  const updateNumber = (id, person) => {
    const updatedPerson = {id: id, ...person}
    if (window.confirm(`${updatedPerson.name} is already on the PhoneBook, replace his old number with a new one?`)) {
      phoneBookService
        .update(id, updatedPerson)
        .then(() => {
          setPersons(persons.map(p => p.id !== id ? p : updatedPerson));
          handleMessage(`${updatedPerson.name}'s number has been changed`, 'success-message');
        })
        .catch(error => {
          handleMessage(`Information about "${updatedPerson.name}" has already been removed from the PhoneBook`, 'error-message');
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
    ? persons.filter(person => person.name.toLowerCase().includes(searchName.trim().toLowerCase()))
    : persons;

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
        <PersonForm functions={{
          addContact: addContact, 
          newName: newName, 
          newNumber: newNumber, 
          handleNameChange: handleNameChange, 
          handleNumberChange: handleNumberChange
        }}/>
        <h2>Contacts</h2>
        <div className='persons-list'>
          <ul>
            {contactsToShow.map(person => (
              <Person 
                key={person.id} 
                person={person} 
                removePerson={() => removePerson(person)}
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