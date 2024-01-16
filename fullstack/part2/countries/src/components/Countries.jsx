import React from "react";
import * as Types from "../types";
import Country from "./Country";

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

  return <Country country={country} />
};

export default Countries;
