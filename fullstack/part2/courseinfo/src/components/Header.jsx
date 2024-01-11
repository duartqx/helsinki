import React from "react";
import * as Types from "../types";

/** @typedef {Object} HeaderProps
 * @property {Types.CourseType} course
 **/

/**
 * @param {HeaderProps} props
 **/
const Header = ({ course }) => <h1>{course.name}</h1>;

export default Header;
