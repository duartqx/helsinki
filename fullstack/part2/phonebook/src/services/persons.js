import * as Types from "../types";
import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

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
const parsePersonId = (/** @type {apiPerson} */ p) => {
  const id = parseInt(p.id);
  // Stores the id to ids (It's used on getNextId)
  ids = ids.concat(id);
  return { ...p, id: id };
};

/** @returns {Promise<Types.Person[]>} */
const allPersons = async () => {
  return axios.get(baseUrl).then((res) => {
    return res.data.map((/** @type {apiPerson} */ p) => parsePersonId(p));
  });
};

/**
 * @param {Types.Person} person
 * @returns {Promise<Types.Person>}
 **/
const createPerson = async (person) => {
  const newPerson = { ...person, id: getNextId().toString() };
  return axios.post(baseUrl, newPerson).then((res) => parsePersonId(res.data));
};

const deletePerson = async (/** @type {number} */ id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

/**
 * @param {number} id
 * @param {Types.Person} person
 * @returns {Promise<Types.Person>}
 **/
const updatePerson = async (id, person) => {
  return axios
    .put(`${baseUrl}/${id}`, person)
    .then((res) => parsePersonId(res.data));
};

export default { allPersons, createPerson, updatePerson, deletePerson };
