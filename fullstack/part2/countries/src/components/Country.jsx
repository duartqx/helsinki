import React from "react";
import * as Types from "../types";

/**
 * @param {Object} props
 * @param {Types.Country} props.country
 **/
const Country = ({ country }) => {
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
    </>
  );
};

export default Country;
