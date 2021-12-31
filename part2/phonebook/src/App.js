import React, { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>{person.name} {person.phone}</p>
  )
}

const Persons = ({persons, search}) => {
  const personsToShow = search ? persons.filter(value => value.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) : persons
  
  return (
    personsToShow.map(person => <Person person={person} key={person.name} />)
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: "040-123456" },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchInput, setSearchInput] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    
    if(persons.some(value => value.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({"name": newName, "phone": newPhone}))
    setNewName('')
    setNewPhone('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchInput} onChange={handleSearchChange} />
        
      <h2>Add New</h2>
      <PersonForm submitHandler={addPerson} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
      
      <h2>Numbers</h2>
      <Persons persons={persons} search={searchInput} />
    </div>
  )
}

export default App