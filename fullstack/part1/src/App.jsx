import React, { useState } from "react";

/**
 * @typedef {Object} ButtonProps
 * @property {React.MouseEventHandler} handleClick
 * @property {string} text
 **/

/**
 * @param {ButtonProps} props
 **/
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

/**
 * @typedef {Object} StatProps
 * @property {string} text
 * @property {number} value
 **/

/**
 * @param {StatProps} props
 **/
const Stat = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    let newGood = good + 1
    return setGood(newGood)
  }

  const handleNeutral = () => {
    let newNeutral = neutral + 1
    return setNeutral(newNeutral)
  }

  const handleBad = () => {
    let newBad = bad + 1
    return setBad(newBad)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <h2>statistics</h2>
      <Stat text="good" value={good} />
      <Stat text="neutral" value={neutral} />
      <Stat text="bad" value={bad} />
    </div>
  )
};

export default App;
