import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'

const Person = ({person, deleteHandler}) => {
  return (
    <p>{person.name} {person.number} <button onClick={deleteHandler}>Delete</button></p>
  )
}

const Persons = ({persons, search, deleteHandler}) => {
  const personsToShow = search ? persons.filter(value => value.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) : persons
  
  return (
    personsToShow.map(person => <Person person={person} key={person.id} deleteHandler={() => deleteHandler(person.id)} />)
  )
}

const Filter = ({value, onChange}) => {
  return (
    <p>Filter shown with <input value={value} onChange={onChange} /></p>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.submitHandler}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        phone: <input value={props.newPhone} onChange={props.handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Notification  = ({ message, error = true }) => {
  if (message === null) {
    return null
  }

  const className = error ? 'error' : 'message'
  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorState, setErrorState] = useState(true)
  
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    if(persons.some(value => value.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        const id = persons.filter(person => person.name === newName)[0].id
        personsService
          .update(id, {"name": newName, "number": newPhone})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setErrorMessage(`Updated ${newName}`)
            setErrorState(false)
            setNewName('')
            setNewPhone('')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
      return
    }

    personsService
      .create({"name": newName, "number": newPhone})
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setErrorMessage(`Added ${newName}`)
        setErrorState(false)
        setNewName('')
        setNewPhone('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
  }

  const deletePerson = (id) => {
    const name = persons.filter(person => person.id === id)[0].name
    if(window.confirm(`Delete ${name}?`)) {
      personsService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setErrorMessage(`Deleted ${name}`)
            setErrorState(true)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <Notification message={errorMessage} error={errorState} />
      <h2>Phonebook</h2>
      <Filter value={searchInput} onChange={handleSearchChange} />
        
      <h2>Add New</h2>
      <PersonForm submitHandler={addPerson} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
      
      <h2>Numbers</h2>
      <Persons persons={persons} search={searchInput} deleteHandler={deletePerson} />
    </div>
  )
}

export default App