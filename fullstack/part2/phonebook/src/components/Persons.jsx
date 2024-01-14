import React from "react";
import * as Types from "../types";

/**
 * @param {Object} personProps
 * @param {Types.Person} personProps.person
 **/
const Person = ({ person }) => {
  return (
    <p>
      {person.id} {person.name} {person.number}
    </p>
  );
};

/**
 * @param {Object} personProps
 * @param {Types.GetPersons} personProps.getPersons
 **/
const Persons = ({ getPersons }) => {
  return (
    <>
      {getPersons().map((/** @type {Types.Person} */ p) => (
        <Person person={p} />
      ))}
    </>
  );
};

export default Persons;
