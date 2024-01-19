import * as Types from "./types";
import Alert from "./components/Alert";
import FilterPersons from "./components/FilterPersons";
import Persons from "./components/Persons";
import PhoneBookForm from "./components/PhoneBookForm";
import React from "react";
import personsService from "./services/persons";
import { useEffect, useState } from "react";

/**
 * @typedef {Object} apiPerson
 * @property {string} name
 * @property {string} number
 * @property {string} id
 **/

const App = () => {
  
  const [persons, setPersons] = useState(/** @type {Types.Person[]} */ ([]));
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  /** @type {[
   *   Types.StatusObject,
   *   React.Dispatch<React.SetStateAction<Types.StatusObject>>
   * ]}
   **/
  const [statusAlert, setStatusAlert] = useState({});

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

  /** @param {Types.StatusObject} statusObj */
  const setAlertStatus = (statusObj) => {
    setStatusAlert(statusObj);
    setTimeout(() => setStatusAlert({}), 5000);
  };

  /** @type {Types.DeletePerson} */
  const deletePersonHandler = (person) => () => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService.deletePerson(person).then((statusObj) => {
        setAlertStatus(statusObj);
        if (statusObj.success) {
          setPersons(() => persons.filter((p) => p.id !== person.id));
        }
      });
    }
  };

  /** @type {React.FormEventHandler} */
  const handleForm = (e) => {
    e.preventDefault();

    const useCases = {
      /** @param {Types.Person} person @param {number} personExistsIndex */
      personExistsAndConfirmedForUpdate: (person, personExistsIndex) => {
        personsService.updatePerson(person).then((p) => {
          if (p) {
            const personsCopy = [...persons];

            personsCopy[personExistsIndex] = p;

            setPersons(() => personsCopy);

            setAlertStatus({
              success: true,
              status: "success",
              message: `Successfully updated ${person.name}`,
            });
          } else {
            setAlertStatus({
              success: false,
              status: "danger",
              message: `Failed to update ${person.name}`,
            });
          }
          setNewName("");
          setNewPhone("");
        });
      },
      personDoesNotExistsSoCreate: (/** @type {Types.Person} */ person) => {
        personsService.createPerson(person).then((p) => {
          if (p) {
            setPersons(() => persons.concat(p));

            setAlertStatus({
              success: true,
              status: "success",
              message: `Successfully created ${person.name}`,
            });
          } else {
            setAlertStatus({
              success: false,
              status: "danger",
              message: `Failed to create ${person.name}`,
            });
          }
          setNewName("");
          setNewPhone("");
        });
      },
    };

    if (!newName) {
      alert("You need to specify a name!");
      return;
    }

    if (!newPhone) {
      alert("You need to specify a phone!");
      return;
    }

    const personExistsIndex = persons.findIndex(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    );
    const personExists = () => personExistsIndex !== -1;

    if (personExists()) {
      if (
        window.confirm(
          `${persons[personExistsIndex].name} is already added to ` +
            `phonebook, replace the old number with a new one?`,
        )
      ) {
        // If personExists && window.confirm for update -> Updates
        useCases.personExistsAndConfirmedForUpdate(
          {
            ...persons[personExistsIndex],
            number: newPhone,
          },
          personExistsIndex,
        );
      }
      // If personExists && !window.confirm -> Returns
      return;
    }
    // If !personExists -> Creates
    useCases.personDoesNotExistsSoCreate({
      name: newName,
      number: newPhone,
    });
  };

  /** @type {Types.PhoneBookInputValue[]} */
  const formParts = [
    {
      label: "name",
      value: newName,
      onChange: (e) => {
        setNewName(e.target.value);
      },
    },
    {
      label: "number",
      value: newPhone,
      onChange: (e) => {
        setNewPhone(e.target.value);
      },
    },
  ];

  return (
    <div className="my-5">
      {statusAlert?.message && <Alert alertObj={statusAlert} />}
      <h2 className="px-5">Phonebook</h2>
      <FilterPersons
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        value={filter}
      />
      <h3 className="px-5">Add a new</h3>
      <PhoneBookForm onSubmit={handleForm} parts={formParts} />
      <h3 className="px-5">Numbers</h3>
      <Persons
        getPersons={getPersons}
        deletePersonHandler={deletePersonHandler}
      />
    </div>
  );
};

export default App;
