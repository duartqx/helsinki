import React from "react";
import Header from "./Header";
import Content from "./Content";
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
    </>
  );
};

export default Course;
