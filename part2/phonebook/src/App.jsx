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
        })
        .catch(error => {
          console.log('attempt fail');
        });
    }
  };

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter searchFilter={searchFilter} handleFilterChange={handleFilterChange} />

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
