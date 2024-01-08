import React from "react"
import Header from "./components/Header"
import Content from "./components/Content"

const App = () => {

  const course = "Half Stack application development"

  const content = [
    {
      title: "Fundamentals of React",
      quantity: 10
    },
    {
      title: "Using props to pass data",
      quantity: 7
    },
    {
      title: "State of a component",
      quantity: 14
    },
  ]

  return (
    <div>
      <Header course={course} />
      <Content contentObjects={content} />

      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App
