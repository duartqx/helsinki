import React from "react";
import * as Types from "../types";

/**
 * @param {{
 *  capital: string | undefined
 *  weather: Types.Weather | null
 * }} props
 **/
const Weather = ({ capital, weather }) => {
  return capital && weather && (
    <div>
      <h3>Weather in {capital}</h3>
      <p>
        temperature {weather.current.temperature_2m}{" "}
        {weather.current_units.temperature_2m}
      </p>
      <p>
        wind {weather.current.wind_speed_10m}{" "}
        {weather.current_units.wind_speed_10m}
      </p>
    </div>
  );
};

/**
 * @param {{
 *  country: Types.Country
 *  weather: Types.Weather | null
 * }} props
 **/
const Country = ({ country, weather }) => {
  const weatherIsAvailable = () =>
    weather !== null && country.capital?.length !== 0;
  return (
    <>
      <h2>{country.name.common}</h2>
      {country.capital?.map((c) => (
        <p key={`key_capital_${c}`}>capital {c}</p>
      ))}
      <p>area {country.area}</p>
      <h4>languages</h4>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((l) => (
            <li key={`key_language_${l}`}>{l}</li>
          ))}
      </ul>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
      {weatherIsAvailable() && (
        <Weather
          capital={country["capital"] && country.capital[0]}
          weather={weather}
        />
      )}
    </>
  );
};

export default Country;
