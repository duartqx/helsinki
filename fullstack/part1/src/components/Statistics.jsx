import React from "react";

/**
 * @typedef {Object} StatProps
 * @property {string} text
 * @property {number} value
 **/

/**
 * @param {StatProps} props
 **/
const Stat = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

/**
 * @typedef {Object} Stat
 * @property {number} value
 * @property {string} text
 **/

/**
 * @typedef {Object} StatisticsProps
 * @property {Stat[]} stats
 * @property {boolean} shouldRender
 **/

/**
 * @param {StatisticsProps} props
 **/
const Statistics = ({ stats, shouldRender }) => {
  if (!shouldRender) {
    return <>No feedback given</>
  }
  return (
    <>
      {stats.map((st, idx) => (
        <Stat text={st.text} value={st.value} key={`Stat_key_${idx}`} />
        // This probably counts for 1.10, right?
      ))}
    </>
  );
};

export default Statistics;
