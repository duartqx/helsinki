import * as Types from "./types";
import FilterPersons from "./components/FilterPersons";
import Persons from "./components/Persons";
import PhoneBookForm from "./components/PhoneBookForm";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

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

  const hookPersons = () => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(
        res.data.map((/** @type {apiPerson} */ p) => {
          return { ...p, id: parseInt(p.id) };
        }),
      );
    });
  };

  useEffect(hookPersons, []);

  /** @returns {number} **/
  const getNextId = () => (persons[persons.length - 1]?.id || 0) + 1;

  /** @type {Types.GetPersons} */
  const getPersons = () => {
    return filter
      ? persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase()),
        )
      : persons;
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

    setPersons(
      persons.concat({
        name: newName,
        number: newPhone,
        id: getNextId(),
      }),
    );
    setNewName("");
    setNewPhone("");
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
      <Persons getPersons={getPersons} />
    </div>
  );
};

export default App;
