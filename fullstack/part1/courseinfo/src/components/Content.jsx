import React from "react";
import * as Types from "../types";

/**
 * @typedef {Object} PartProps
 * @property {Types.CoursePart} part
 **/

/**
 * @param {PartProps} props
 **/
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

/**
 * @typedef {Object} ContentProps
 * @property {Types.CourseType} course
 **/

/**
 * @param {ContentProps} props
 **/
const Content = ({ course }) => (
  <>
    {course.parts.map((part) => (
      <Part part={part} key={part.id + part.name} />
    ))}
  </>
);

export default Content;
