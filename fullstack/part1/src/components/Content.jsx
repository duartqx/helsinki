import React from "react";

/**
 * @typedef {Object} PartProps
 * @property {string} title
 * @property {number} quantity
 **/

/**
 * @param {PartProps} props
 **/
const Part = ({ title, quantity }) => (
  <p>
    {title} {quantity}
  </p>
);

/**
 * @typedef {Object} Course
 * @property {string} name
 * @property {PartProps[]} parts
 **/

/**
 * @typedef {Object} ContentProps
 * @property {Course} course
 **/

/**
 * @param {ContentProps} props
 **/
const Content = ({ course }) => (
  <>
    {course.parts.map((obj, i) => (
      <Part title={obj.title} quantity={obj.quantity} key={`content_part_${i}`} />
    ))}
  </>
);

export default Content;
