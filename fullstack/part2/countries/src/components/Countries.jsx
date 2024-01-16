import React from "react";
import * as Types from "../types";

/**
 * @param {Object} props
 * @param {Types.Country[]} props.countries
 **/
const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length > 1) {
    return (
      <>
        {countries.map((c) => (
          <div>{c.name.common}</div>
        ))}
      </>
    );
  }

  const country = countries[0];

  if (!country) {
    return <div>No matches found, specify another filter</div>;
  }

  return (
    <>
      <h2>{country.name.common}</h2>
      {country.capital?.map((c) => (
        <p>capital {c}</p>
      ))}
      <p>area {country.area}</p>
      <h4>languages</h4>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((l) => <li>{l}</li>)}
      </ul>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    </>
  );
};

export default Countries;
