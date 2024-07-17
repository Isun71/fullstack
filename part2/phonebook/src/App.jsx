import { useState, useEffect } from 'react';
import phoneService from './services/phones';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    console.log('effect');
    phoneService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);
  console.log('added', persons.length, 'persons');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find(p => p.name === newName);

    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log(`try update ${newName}`);
        const updatedPerson = { ...person, number: newNumber };

        phoneService
          .update(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson));
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${newName}'s number`);
          })
          .catch(error => {
            showNotification(`Error: Information of '${person.name}' has already been removed from server`, 'error');
            setPersons(persons.filter(p => p.id !== person.id));
          });
        console.log(`number of ${person.name} updated from ${person.number}`);
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      console.log(newPerson.name, 'added');
      phoneService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${newName}`);
        })
        .catch(error => {
          showNotification(`Error: Could not add ${newName}`, 'error');
        });
    }
  };

  const handleDelete = (id) => {
    console.log(`try delete the person with id = ${id}`);
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          showNotification(`Deleted ${person.name}`);
        })
        .catch(error => {
          showNotification(`Error: Information of '${person.name}' has already been removed from server`);
          setPersons(persons.filter(p => p.id !== id));
          console.log('attempt fail');
        });

    }
  };

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='notification'>
        {message}
      </div>
    )
  };

  const showNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter searchFilter={searchFilter} handleFilterChange={handleFilterChange} />

      <Notification message={notificationMessage} />

      <h3>Add a new</h3>
      
      <PersonForm 
        addPerson={addPerson} 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
