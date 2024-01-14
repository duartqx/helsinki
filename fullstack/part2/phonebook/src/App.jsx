import { useState } from "react";
import React from "react";
import * as Types from "./types";
import Persons from "./components/Persons";
import PhoneBookForm from "./components/PhoneBookForm";
import FilterPersons from "./components/FilterPersons";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1,
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2,
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3,
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4,
    },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  /** @returns {number} */
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
      <h2>Add a new</h2>
      <PhoneBookForm onSubmit={handleForm} parts={formParts} />
      <h2>Numbers</h2>

      <Persons getPersons={getPersons} />
    </div>
  );
};

export default App;
