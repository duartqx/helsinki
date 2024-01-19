import * as Types from "../types";
import axios from "axios";

const baseUrl = "/api/persons";

/** @type {number[]} */
let ids = [];

/** @returns {number} */
const getNextId = () => Math.max(...ids) + 1;

/**
 * @typedef {Object} apiPerson
 * @property {string} name
 * @property {string} number
 * @property {string} id
 **/

/** @returns {Types.Person} */
/** @returns {Promise<Types.Person[]>} */
const allPersons = async () => {
  return axios
    .get(baseUrl)
    .then((res) => res.data)
    .catch((_) => []);
};

/**
 * @param {Types.Person} person
 * @returns {Promise<Types.Person | null>}
 **/
const createPerson = async (person) => {
  const newPerson = { ...person, id: getNextId().toString() };
  return axios
    .post(baseUrl, newPerson)
    .then((res) => res.data)
    .catch((_) => null);
};

/** @returns {Promise<Types.StatusObject>} */
const deletePerson = async (/** @type {Types.Person} */ person) => {
  return axios
    .delete(`${baseUrl}/${person.id}`)
    .then((_) => {
      return {
        message: `Successfully deleted ${person.name}`,
        status: "success",
        success: true,
      };
    })
    .catch((_) => {
      return {
        message: `Could not delete ${person.name}`,
        status: "danger",
        success: true,
      };
    });
};

/**
 * @param {Types.Person} person
 * @returns {Promise<Types.Person | null>}
 **/
const updatePerson = async (person) => {
  return axios
    .put(`${baseUrl}/${person.id}`, person)
    .then((res) => res.data)
    .catch((_) => null);
};

export default { allPersons, createPerson, updatePerson, deletePerson };
