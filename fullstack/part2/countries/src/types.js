/** @module */

/**
 * @typedef {Object} Name
 * @property {string} common
 * @property {string} official
 * @property {Name} [nativeName]
 **/

/**
 * @typedef {{
 *  name: Name
 *  tld?: string[]
 *  cca2: string
 *  ccn3?: string
 *  cca3: string
 *  cioc?: string
 *  independent?: boolean
 *  status: string
 *  unMember: boolean
 *  currencies?: {name: string, symbol: string}
 *  idd: {root: string, suffixes: string[]}
 *  capital?: string[]
 *  altSpellings: string[]
 *  region: string
 *  subregion?: string
 *  languages?: {string: string}
 *  translations: {string: Name}
 *  latlng: number[]
 *  landlocked: boolean
 *  borders?: string[]
 *  area: number
 *  demonyms?: {f: string, m: string}
 *  flag: string
 *  maps: {googleMaps: string, openStreetMaps: string}
 *  population: number
 *  gini?: {string: number}
 *  fifa?: string
 *  car: {signs: string[], side: string}
 *  timezones: string[]
 *  continents: string[]
 *  flags: {png: string, svg: string, alt: string}
 *  coatOfArms: {png: string, svg: string}
 *  startOfWeek: string
 *  capitalInfo: {latlng: number[]}
 *  postalCode?: {format: string, regex: string}
 * }} Country
 **/

/**
 * @typedef {{
 *  latitude: number
 *  longitude: number
 *  generationtime_ms: number
 *  utc_offset_seconds: number
 *  timezone: string
 *  timezone_abbreviation: string
 *  elevation: number
 *  current_units: {
 *    time: string
 *    internal: string
 *    temperature_2m: string
 *    wind_speed_10m: string
 *  }
 *  current: {
 *    time: string 
 *    internal: number
 *    temperature_2m: number
 *    wind_speed_10m: number
 *  }
 * }} Weather
 **/

export const _ = {};
