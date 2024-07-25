import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const alertIfDuplicatedName = () => {
    if (persons.some(person => person.name === newName)) {
      alert(`The name ${newName} is already added to phonebook`)
      return true
    }
    return false
  }

  const alertIfDuplicatedNumber = () => {
    if (persons.some(person => person.number === newNumber)) {
      alert(`The number ${newNumber} is already added to phonebook`)
      return true
    }
    return false
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (alertIfDuplicatedName()) {
      return
    }
    
    if (alertIfDuplicatedNumber()) {
      return
    }

    if (filter !== '') {
      setFilter(filter.concat({ name: newName, number: newNumber }))
    }
    
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
    
  }

  const filterPersons = (event) => {
    const filter = event.target.value
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    setFilter(filteredPersons)
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = () => {
    if (filter === '') {
      return persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)
    }
    return filter.map(person => <li key={person.name}>{person.name} {person.number}</li>)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPersons={filterPersons} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons handleFilter={handleFilter} />
      
    </div>
  )
}

export default App