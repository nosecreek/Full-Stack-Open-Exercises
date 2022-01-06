import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country, searchChange}) => {
  return (
    <p>{country.name.common} <button onClick={searchChange} value={country.name.common}>show</button></p>
  )
}

const Weather = ({city}) => {
  const [weather, setWeather] = useState(null) 
  
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [city])

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p><b>Temperature</b> {weather && weather.main.temp} degrees celsius</p>
      {weather && <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />}
      <p><b>Wind</b> {weather && weather.wind.speed} km/h</p>
    </div>
  )
}

const Results = ({countries, search, searchChange}) => {
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
        <Weather city={countriesToShow[0].capital} />
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
      {countriesToShow.map(country => <Country country={country} searchChange={searchChange} key={country.name.common} />)}
    </div>
  )
}

const Search = ({value, onChange}) => {
  return (
    <p>find countries <input value={value} onChange={onChange} /></p>
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
      <Results countries={countries} search={searchInput} searchChange={handleSearchChange} />
    </div>
  )
}

export default App