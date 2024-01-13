import { useState } from "react";
import React from "react";

/**
 * @typedef {Object} Person
 * @property {string} name
 * @property {string} number
 * @property {number} id
 **/

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
  const getNextId = () => (persons[persons.length - 1]?.id || 0) + 1

  /** @returns {Person[]} */
  const getPersons = () => {
    return filter
      ? persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase()),
        )
      : persons;
  };

  /** @param {React.ChangeEvent<HTMLInputElement>} e */
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  /** @param {React.ChangeEvent<HTMLInputElement>} e */
  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  /** @param {React.ChangeEvent<HTMLInputElement>} e */
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

    if (persons.filter((p) => p.name === newName).length) {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input type="text" onChange={handleFilterChange} value={filter} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={handleForm}>
        <div>
          name: <input type="text" value={newName} onChange={handleNewName} />
        </div>
        <div>
          number:{" "}
          <input type="text" value={newPhone} onChange={handleNewPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {getPersons().map((p) => (
        <p>
          {p.id} {p.name} {p.number}
        </p>
      ))}
    </div>
  );
};

export default App;
