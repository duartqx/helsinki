import { useState } from "react";
import React from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", phone: "040-123456789" }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

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
      alert("You need to specify a name!")
      return
    }

    if (!newPhone) {
      alert("You need to specify a phone!")
      return
    }

    if (persons.filter((p) => p.name === newName).length) {
      alert(`${newName} is already added to phonebook!`)
      return
    }
    setPersons(persons.concat({ name: newName, phone: newPhone }));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleForm}>
        <div>
          name: <input type="text" value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input type="text" value={newPhone} onChange={handleNewPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((p) => <p>{p.name} {p.phone}</p>)}
    </div>
  );
};

export default App;
