import React from "react";
import * as Types from "../types";

/**
 * @param {Object} props
 * @param {() => void} props.handleDelete
 **/
const DeleteButton = ({ handleDelete }) => {
  return <button className="btn btn-sm btn-danger float-end" onClick={handleDelete}>delete</button>;
};

/**
 * @param {Object} personProps
 * @param {Types.Person} personProps.person
 * @param {() => void} personProps.deletePersonHandler
 **/
const Person = ({ person, deletePersonHandler }) => {
  return (
    <tr className="align-middle">
      <th scope="row">{person.id}</th>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><DeleteButton handleDelete={deletePersonHandler} /></td>
    </tr>
  );
};

/**
 * @param {Object} personProps
 * @param {Types.GetPersons} personProps.getPersons
 * @param {Types.DeletePerson} personProps.deletePersonHandler
 **/
const Persons = ({ getPersons, deletePersonHandler }) => {
  return (
    <div className="px-5 col-md-12">
      <table className="table table-hover">
        <tbody>
          {getPersons().map((/** @type {Types.Person} */ person) => (
            <Person
              person={person}
              deletePersonHandler={deletePersonHandler(person)}
              key={`person_${person.id}`}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
