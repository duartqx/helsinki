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
 * @returns {Promise<{ success: boolean, data: any[] }>}
 **/
const createPerson = async (person) => {
  const newPerson = { ...person, id: getNextId().toString() };
  return axios
    .post(baseUrl, newPerson)
    .then((res) => { return { success: true, data: [res.data] } })
    .catch((e) => { return { success: false, data: Object.values(e.response.data) } });
};

/** @returns {Promise<{ success: boolean, data: any[] }>} */
const deletePerson = async (/** @type {Types.Person} */ person) => {
  return axios
    .delete(`${baseUrl}/${person.id}`)
    .then((_) => {
      return { success: true, data: [`Successfully deleted ${person.name}`]}
    })
    .catch((_) => {
      return { success: false, data: [`Could not delete ${person.name}`]}
    });
};

/**
 * @param {Types.Person} person
 * @returns {Promise<{ success: boolean, data: any[] }>}
 **/
const updatePerson = async (person) => {
  return axios
    .put(`${baseUrl}/${person.id}`, person)
    .then((_) => {
      return { success: true, data: [`Successfully updated ${person.name}`]}
    })
    .catch((_) => {
      return { success: false, data: [`Could not update ${person.name}`]}
    });
};

export default { allPersons, createPerson, updatePerson, deletePerson };
