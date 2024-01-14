import React from "react";

/**
 * @typedef {Object} TotalProps
 * @property {number} total
 **/

/**
 * @param {TotalProps} props
 **/
const Total = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

export default Total;
