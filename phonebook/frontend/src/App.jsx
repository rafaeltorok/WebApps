import { useState, useEffect } from 'react';
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

    if (newPerson.name === '' || newPerson.number === '') {
      handleMessage(`Both fields must be filled`, 'error-message');
    } else if (persons.some(person => 
                person.name.toLowerCase() === newPerson.name.toLowerCase()
                && person.number === newPerson.number
              )) {
      handleMessage(`"${newPerson.name}" has already been added to the PhoneBook`, 'error-message');
    } else if (persons.some(person => 
                person.name.toLowerCase() === newPerson.name.toLowerCase()
                && person.number !== newPerson.number
    )) {
      const personToUpdate = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase());
      updateNumber(personToUpdate.id, newPerson);
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
    setTimeout(() => {
      setMessage(null);
    }, 5000);
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