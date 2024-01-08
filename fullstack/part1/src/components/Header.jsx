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
 * @typedef {Object} HeaderProps
 * @property {Course} course
 **/

/**
 * @param {HeaderProps} props
**/
const Header = ({ course }) => {

  return (
    <h1>{course.name}</h1>
  )
}

export default Header
