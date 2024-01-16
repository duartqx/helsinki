import axios from "axios";
import * as Types from "../types"

const endpoints = {
    all: "https://studies.cs.helsinki.fi/restcountries/api/all",
    one: "https://studies.cs.helsinki.fi/restcountries/api/name/"
}

/** @returns {Promise<Types.Country[]>} */
const all = async () => {
    return axios.get(endpoints.all).then(res => res.data)
}

export default { all };
