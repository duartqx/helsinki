import React from "react";
import * as Types from "../types";
import Country from "./Country";

/**
 * @param {Object} props
 * @param {Types.Country[]} props.countries
 * @param {(name: string) => () => void} props.setFilter
 **/
const Countries = ({ countries, setFilter }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length > 1) {
    return (
      <>
        {countries.map((c) => (
          <div key={`key_countries_${c.name.common}`}>
            {c.name.common}{" "}
            <button onClick={setFilter(c.name.common)}>show</button>
          </div>
        ))}
      </>
    );
  }

  const country = countries[0];

  if (!country) {
    return <div>No matches found, specify another filter</div>;
  }

  return <Country country={country} />;
};

export default Countries;
