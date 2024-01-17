import axios from "axios";
import * as Types from "../types";

/**
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<Types.Weather>}
 **/
const getWeatherByLatLng = async (lat, lng) => {
  return axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=` +
        `${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m`,
    )
    .then((res) => res.data);
};

export default { getWeatherByLatLng };
