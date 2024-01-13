import React from "react";
import * as Types from "../types";

/**
 * @typedef {Object} TotalProps
 * @property {Types.CourseType} course
 **/

/**
 * @param {TotalProps} props
 **/
const Total = ({ course }) => {
  const total = course.parts
    .map((p) => p.exercises)
    .reduce((acc, curr) => acc + curr);

  return <p style={{ fontWeight: "bold" }}>total of {total} execises</p>;
};

export default Total;
