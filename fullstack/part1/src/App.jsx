import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      title: "Fundamentals of React",
      quantity: 10,
    },
    {
      title: "Using props to pass data",
      quantity: 7,
    },
    {
      title: "State of a component",
      quantity: 14,
    },
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
