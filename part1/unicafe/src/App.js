import React, { useState } from 'react'

const Title = ({name}) => <h2>{name}</h2>

const Button = ({text, handleClick}) => {
  
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({type, name}) => <p>{name} {type}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let total = good+neutral+bad

  return (
    <div>
      <Title name="Give Feeback" />
      <Button text="Good" handleClick={() => setGood(good+1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral+1)} />
      <Button text="Bad" handleClick={() => setBad(bad+1)} />
      <Title name="Statistics" />
      <Statistics name="Good" type={good} />
      <Statistics name="Neutral" type={neutral} />
      <Statistics name="Bad" type={bad} />
      <Statistics name="All" type={total} />
      <Statistics name="Average" type={(good-bad)/total} />
      <Statistics name="Positive" type={(good/total)*100 + "%"} />
    </div>
  )
}

export default App