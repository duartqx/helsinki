import React from "react"

/**
 * @typedef {Object} Part
 * @property {string} title
 * @property {number} quantity
 **/

/**
 * @typedef {Object} TotalProps
 * @property {Part[]} parts
 **/

/**
 * @param {TotalProps} props
**/
const Total = ({ parts }) => {
  let total = parts.reduce((acc, obj) => acc + obj.quantity, 0);
  return (
    <p>Number of exercises {total}</p>
  )
}

export default Total
