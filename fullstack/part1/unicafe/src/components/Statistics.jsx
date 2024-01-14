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
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
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
    return <>No feedback given</>;
  }
  return (
    <>
      <table>
        <tbody>
          {stats.map((st, idx) => (
            <Stat text={st.text} value={st.value} key={`Stat_key_${idx}`} />
            // This probably counts for 1.10, right?
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
