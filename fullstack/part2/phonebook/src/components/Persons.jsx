import React from "react";
import * as Types from "../types";

/**
 * @param {Object} props
 * @param {() => void} props.handleDelete
 **/
const DeleteButton = ({ handleDelete }) => {
  return <button onClick={handleDelete}>delete</button>;
};

/**
 * @param {Object} personProps
 * @param {Types.Person} personProps.person
 * @param {() => void} personProps.deletePersonHandler
 **/
const Person = ({ person, deletePersonHandler }) => {
  return (
    <p>
      {person.id} {person.name} {person.number}{" "}
      <DeleteButton handleDelete={deletePersonHandler} />
    </p>
  );
};

/**
 * @param {Object} personProps
 * @param {Types.GetPersons} personProps.getPersons
 * @param {Types.DeletePerson} personProps.deletePersonHandler
 **/
const Persons = ({ getPersons, deletePersonHandler }) => {
  return (
    <>
      {getPersons().map((/** @type {Types.Person} */ person) => (
        <Person
          person={person}
          deletePersonHandler={deletePersonHandler(person)}
          key={`person_${person.id}`}
        />
      ))}
    </>
  );
};

export default Persons;
