import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
import * as Types from "../types"

/**
 * @typedef {Object} CourseProp
 * @property {Types.CourseType} course
 **/

/**
 * @param {CourseProp} props
 **/
const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;
