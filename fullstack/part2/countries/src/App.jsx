import React, { useEffect, useState } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";
import * as Types from "./types";
import Countries from "./components/Countries";

function App() {
  /** @type {Types.Country[]} */
  const initCountries = [];

  /** @type {{string: Types.Weather} | {}} */
  const cachedWeatherForecast = {};

  const [countries, setCountries] = useState(initCountries);
  const [singleCountry, setSingleCountry] = useState(
    /** @type {Types.Country | null} */ (null),
  );
  const [currentWeather, setCurrentWeather] = useState(
    /** @type {Types.Weather | null} */ (null),
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countryService.all().then((data) => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    if (!singleCountry) {
      setCurrentWeather(null);
      return;
    }

    /** @type {string} */
    const currentKey = singleCountry.name.common
      .replace(/ /g, "")
      .toLowerCase();

    if (cachedWeatherForecast[currentKey]) {
      setCurrentWeather(cachedWeatherForecast[currentKey]);
    } else {
      weatherService
        .getWeatherByLatLng(
          singleCountry.capitalInfo.latlng[0],
          singleCountry.capitalInfo.latlng[1],
        )
        .then((weather) => {
          cachedWeatherForecast[currentKey] = weather;
          setCurrentWeather(weather);
        });
    }
  }, [singleCountry]);

  /** @type {(e: React.ChangeEvent<HTMLInputElement>) => void} */
  const handleFilterCountries = (e) => setFilter(e.target.value);

  const filterCountries = () => {
    return countries.filter((c) => {
      const re = new RegExp(`^${c.name.common.toLowerCase()}$`);
      return (
        re.test(filter.toLowerCase()) ||
        c.name.common.toLowerCase().includes(filter.toLowerCase())
      );
    });
  };

  /** @type {(name: string) => () => void} */
  const showCountryByFilter = (name) => () => setFilter(name);

  return (
    <>
      <div className="input-group">
        <label htmlFor="findContries" className="form-label">
          Find countries
        </label>
        <input
          type="text"
          className="form-control"
          name="findCountries"
          value={filter}
          onChange={handleFilterCountries}
        />
      </div>
      <div className="table table-hover">
        <Countries
          countries={filterCountries()}
          setFilter={showCountryByFilter}
          setSingleCountry={setSingleCountry}
          currentWeather={currentWeather}
        />
      </div>
    </>
  );
}

export default App;
