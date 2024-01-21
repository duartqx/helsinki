/** @typedef {{
 *    _id?: mongoose.Types.ObjectId,
 *    id?: string,
 *    name?: any,
 *    number?: any
 *  }} Person
 **/

/** @typedef {{ name?: string, number?: string }} PersonDTO **/

/**
 * @typedef {{
 *   name?: string,
 *   nameLength?: string,
 *   number?: string,
 *   numberLength?: string,
 *   numberFormat?: string,
 *   unique?: string
 * }} PersonError
 **/

import mongoose from "mongoose"; // eslint-disable-line no-unused-vars

export const _ = {};
