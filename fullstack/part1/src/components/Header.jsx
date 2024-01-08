import React from "react"

/**
 * @typedef {Object} HeaderProps
 * @property {string} course
 **/

/**
 * @param {HeaderProps} props
**/
const Header = ({ course }) => {

  return (
    <h1>{course}</h1>
  )
}

export default Header
