import React, { useState } from 'react'

const Title = ({name}) => <h2>{name}</h2>

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({value, name}) => <p>{name} {value}</p>

const Statistics = ({good, bad, neutral}) => {
  let total = good+neutral+bad

  if(total === 0) {
    return (
      <p>No Feeback Yet</p>
    )
  }

  return (
    <div>
      <StatisticLine name="Good" value={good} />
      <StatisticLine name="Neutral" value={neutral} />
      <StatisticLine name="Bad" value={bad} />
      <StatisticLine name="All" value={total} />
      <StatisticLine name="Average" value={(good-bad)/total} />
      <StatisticLine name="Positive" value={(good/total)*100 + "%"} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <Title name="Give Feeback" />
      <Button text="Good" handleClick={() => setGood(good+1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral+1)} />
      <Button text="Bad" handleClick={() => setBad(bad+1)} />
      <Title name="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App