import * as Types from "../types";
import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

/**
 * @typedef {Object} apiPerson
 * @property {string} name
 * @property {string} number
 * @property {string} id
 **/

/** @returns {Types.Person} */
const parsePersonId = (/** @type {apiPerson} */ p) => {
  return { ...p, id: parseInt(p.id) };
};

/** @returns {Promise<Types.Person[]>} */
const all = async () => {
  return axios.get(baseUrl).then((res) => {
    return res.data.map((/** @type {apiPerson} */ p) => parsePersonId(p));
  });
};

/**
 * @param {Types.Person} person
 * @returns {Promise<Types.Person>}
 **/
const create = async (person) => {
  return axios.post(baseUrl, person).then((res) => parsePersonId(res.data));
};

/**
 * @param {number} id
 * @param {Types.Person} person
 * @returns {Promise<Types.Person>}
 **/
const update = async (id, person) => {
  return axios
    .put(`${baseUrl}/${id}`, person)
    .then((res) => parsePersonId(res.data));
};

export default { all, create, update };
