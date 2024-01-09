import React, { useState } from "react";
import Statistics from "./components/Statistics";
import Buttons from "./components/Buttons";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const getAll = () => good + neutral + bad;
  const getAvg = () => (good - bad) / getAll() || 0;
  const getPositive = () => (good * 100) / getAll() || 0;

  let stats = [
    {
      text: "good",
      value: good,
      handleClick: function() {
        let newGood = good + 1;
        return setGood(newGood);
      },
    },
    {
      text: "neutral",
      value: neutral,
      handleClick: function() {
        let newNeutral = neutral + 1;
        return setNeutral(newNeutral);
      },
    },
    {
      text: "bad",
      value: bad,
      handleClick: function() {
        let newBad = bad + 1;
        return setBad(newBad);
      },
    },
    {
      text: "all",
      value: getAll(),
    },
    {
      text: "average",
      value: getAvg(),
    },
    {
      text: "positives",
      value: getPositive(),
    },
  ];
  return (
    <div>
      <h2>give feedback</h2>
      <Buttons buttons={stats}/>
      <h2>statistics</h2>
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
