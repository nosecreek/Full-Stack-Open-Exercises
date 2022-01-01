import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return (
    <p>{country.name.common}</p>
  )
}

const Results = ({countries, search}) => {
  //console.log("country",countries[0].name.common)
  const countriesToShow = search ? countries.filter(country => country.name.common.toLowerCase().indexOf(search.toLowerCase()) !== -1) : []
  
  if(countriesToShow.length === 1) {
    return (
      <div>
        <h2>{countriesToShow[0].name.common}</h2>
        <p>capital {countriesToShow[0].capital}</p>
        <p>population {countriesToShow[0].population}</p>
        <h3>Languages</h3>
        {Object.values(countriesToShow[0].languages).map(language => <p key={language}>{language}</p>)}
        <img src={countriesToShow[0].flags.png} />
      </div>
    )
  }
  
  if(countriesToShow.length === 0) {
    return <p>No results</p>
  }

  if(countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  
  return (
    <div>
      {countriesToShow.map(country => <Country country={country} key={country.name.common} />)}
    </div>
  )
}

const Search = ({value, onChange}) => {
  return (
    <p>find countries <input value={value} onChange={onChange} /></p>
  )
}

const ResultsX = (props) => {
  return (
    <div>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        phone: <input value={props.newPhone} onChange={props.handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [searchInput, setSearchInput] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
  }

  return (
    <div>
      <Search value={searchInput} onChange={handleSearchChange} />
      <Results countries={countries} search={searchInput} />
    </div>
  )
}

export default App