/**
 * @module
 **/

/**
 * @typedef {Object} Person
 * @property {string} name
 * @property {string} number
 * @property {number} [id]
 **/

/** @typedef {() => Person[]} GetPersons */

/** @typedef {(person: Person) => () => void} DeletePerson */

/**
 * @typedef {(e: React.ChangeEvent<HTMLInputElement>) => void} InputChangeEvent
 *

/**
 * @typedef {Object} PhoneBookInputValue
 * @property {string} label
 * @property {string} value
 * @property {InputChangeEvent} onChange
 **/

/**
 * @typedef {Object} StatusObject
 * @property {string} [message]
 * @property {string} [status]
 * @property {boolean} [success]
 **/

export const _ = {};
