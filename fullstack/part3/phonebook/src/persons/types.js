/** @typedef {{
 *    _id?: mongoose.Types.ObjectId,
 *    id?: string,
 *    name?: any,
 *    number?: any
 *  }} Person
 **/

/** @typedef {{ name?: string, number?: string }} PersonDTO **/

/** @typedef {{ name?: string, number?: string, unique?: string }} PersonError **/

import mongoose from "mongoose";

export const _ = {};
