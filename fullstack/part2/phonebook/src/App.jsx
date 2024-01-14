import * as Types from "./types";
import FilterPersons from "./components/FilterPersons";
import Persons from "./components/Persons";
import PhoneBookForm from "./components/PhoneBookForm";
import React from "react";
import { useEffect, useState } from "react";
import personsService from "./services/persons";

/**
 * @typedef {Object} apiPerson
 * @property {string} name
 * @property {string} number
 * @property {string} id
 **/

const App = () => {
  /** @type {Types.Person[]} */
  let initialPersonState = []; // Stops jsdoc warnings

  const [persons, setPersons] = useState(initialPersonState);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personsService.allPersons().then((initPersons) => setPersons(initPersons));
  }, []);

  /** @type {Types.GetPersons} */
  const getPersons = () => {
    return filter
      ? persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase()),
        )
      : persons;
  };

  /** @type {Types.DeletePerson} */
  const deletePersonHandler = (person) => () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService.deletePerson(person.id || 0);
      setPersons(() => persons.filter((p) => p.id !== person.id));
    }
  };

  /** @type {Types.InputChangeEvent} */
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  /** @type {Types.InputChangeEvent} */
  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  /** @type {Types.InputChangeEvent} */
  const handleNewPhone = (e) => {
    setNewPhone(e.target.value);
  };

  /** @type {React.FormEventHandler} */
  const handleForm = (e) => {
    e.preventDefault();

    if (!newName) {
      alert("You need to specify a name!");
      return;
    }

    if (!newPhone) {
      alert("You need to specify a phone!");
      return;
    }

    if (
      persons.filter((p) => p.name.toLowerCase() === newName.toLowerCase())
        .length
    ) {
      alert(`${newName} is already added to phonebook!`);
      return;
    }

    personsService
      .createPerson({
        name: newName,
        number: newPhone,
      })
      .then((p) => {
        setPersons(persons.concat(p));
        setNewName("");
        setNewPhone("");
      });
  };

  /** @type {Types.PhoneBookInputValue[]} */
  const formParts = [
    {
      label: "name",
      value: newName,
      onChange: handleNewName,
    },
    {
      label: "number",
      value: newPhone,
      onChange: handleNewPhone,
    },
  ];

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons onChange={handleFilterChange} value={filter} />
      <h3>Add a new</h3>
      <PhoneBookForm onSubmit={handleForm} parts={formParts} />
      <h3>Numbers</h3>
      <Persons
        getPersons={getPersons}
        deletePersonHandler={deletePersonHandler}
      />
    </div>
  );
};

export default App;
