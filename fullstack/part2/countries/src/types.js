/** @module */

/**
 * @typedef {Object} Name
 * @property {string} common
 * @property {string} official
 * @property {Name} [nativeName]
 **/

/**
 * @typedef {Object} Currency
 * @property {string} name
 * @property {string} symbol
 **/

/**
 * @typedef {Object} Idd
 * @property {string} root
 * @property {string[]} suffixes
 **/

/**
 * @typedef {Object} Demonym
 * @property {string} f
 * @property {string} m
 **/

/**
 * @typedef {Object} Maps
 * @property {string} googleMaps
 * @property {string} openStreetMaps
 **/

/**
 * @typedef {Object} Cars
 * @property {string[]} signs
 * @property {string} side
 **/

/**
 * @typedef {Object} Flags
 * @property {string} png
 * @property {string} svg
 * @property {string} alt
 **/

/**
 * @typedef {Object} CoatOfArms
 * @property {string} png
 * @property {string} svg
 **/

/**
 * @typedef {Object} CapitalInfo
 * @property {number[]} latlng
 **/

/**
 * @typedef {Object} PostalCode
 * @property {string} format
 * @property {string} regex
 **/

/**
 * @typedef {Object} Country
 * @property {Name} name
 * @property {string[]} [tld]
 * @property {string} cca2
 * @property {string} [ccn3]
 * @property {string} cca3
 * @property {string} [cioc]
 * @property {boolean} [independent]
 * @property {string} status
 * @property {boolean} unMember
 * @property {{string: Currency}} [currencies]
 * @property {Idd} idd
 * @property {string[]} [capital]
 * @property {string[]} altSpellings
 * @property {string} region
 * @property {string} [subregion]
 * @property {{string: string}} [languages]
 * @property {{string: Name}} translations
 * @property {number[]} latlng
 * @property {boolean} landlocked
 * @property {string[]} [borders]
 * @property {number} area
 * @property {{string: Demonym}} [demonyms]
 * @property {string} flag
 * @property {Maps} maps
 * @property {number} population
 * @property {{string: number}} [gini]
 * @property {string} [fifa]
 * @property {Cars} car
 * @property {string[]} timezones
 * @property {string[]} continents
 * @property {Flags} flags
 * @property {CoatOfArms} coatOfArms
 * @property {string} startOfWeek
 * @property {CapitalInfo} capitalInfo
 * @property {PostalCode} [postalCode]
 **/

export const _ = {};
