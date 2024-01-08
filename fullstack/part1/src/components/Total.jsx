import React from "react"

/**
 * @typedef {Object} Part
 * @property {string} title
 * @property {number} quantity
 **/

/**
 * @typedef {Object} Course
 * @property {string} name
 * @property {Part[]} parts
 **/

/**
 * @typedef {Object} TotalProps
 * @property {Course} course
 **/

/**
 * @param {TotalProps} props
**/
const Total = ({ course }) => {
  let total = course.parts.reduce((acc, obj) => acc + obj.quantity, 0);
  return (
    <p>Number of exercises {total}</p>
  )
}

export default Total
