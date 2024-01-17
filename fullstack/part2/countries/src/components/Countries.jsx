import React, { useEffect, useState } from "react";
import * as Types from "../types";
import Country from "./Country";
import weatherService from "../services/weather";

/**
 * @param {{
 *  countries: Types.Country[]
 *  setSetFilter: (name: string) => () => void
 * }} props
 **/
const Countries = ({ countries, setSetFilter }) => {
  const [currentCountry, setCurrentCountry] = useState(
    /** @type {Types.Country | null} */ (null),
  );
  const [currentWeather, setCurrentWeather] = useState(
    /** @type {Types.Weather | null} */ (null),
  );

  useEffect(() => {
    if (
      !currentCountry ||
      !currentCountry.capitalInfo ||
      !currentCountry.capitalInfo["latlng"]
    ) {
      return;
    }
    weatherService
      .getWeatherByLatLng(
        currentCountry.capitalInfo.latlng[0],
        currentCountry.capitalInfo.latlng[1],
      )
      .then((weather) => {
        setCurrentWeather(weather);
      });
  }, [currentCountry]);

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length > 1) {
    return (
      <>
        {countries.map((c) => (
          <div key={`key_countries_${c.name.common}`}>
            {c.name.common}{" "}
            <button onClick={setSetFilter(c.name.common)}>show</button>
          </div>
        ))}
      </>
    );
  }

  const country = countries[0];

  if (!country) {
    return <div>No matches found, specify another filter</div>;
  } else if (country.name.common !== currentCountry?.name.common) {
    setCurrentCountry(country);
  }

  return <Country country={country} weather={currentWeather} />;
};

export default Countries;
