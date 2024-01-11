import React, { useState } from "react";
import Statistics from "./components/Statistics";
import Buttons from "./components/Buttons";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const avg = (good - bad) / all || 0;
  const positives = (good * 100) / all || 0;

  let stats = [
    {
      text: "good",
      value: good,
      handleClick: () => {
        let newGood = good + 1;
        return setGood(newGood);
      },
    },
    {
      text: "neutral",
      value: neutral,
      handleClick: () => {
        let newNeutral = neutral + 1;
        return setNeutral(newNeutral);
      },
    },
    {
      text: "bad",
      value: bad,
      handleClick: () => {
        let newBad = bad + 1;
        return setBad(newBad);
      },
    },
    {
      text: "all",
      value: all,
    },
    {
      text: "average",
      value: avg,
    },
    {
      text: "positives",
      value: positives,
    },
  ];

  return (
    <div>
      <h2>give feedback</h2>
      <Buttons buttons={stats} />
      <h2>statistics</h2>
      <Statistics stats={stats} shouldRender={all !== 0} />
    </div>
  );
};

export default App;
