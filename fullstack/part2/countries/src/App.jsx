import React, { useEffect, useState } from "react";
import countryService from "./services/countries";
import * as Types from "./types";

function App() {
  /** @type {Types.Country[]} */
  const initCountries = [];

  const [countries, setCountries] = useState(initCountries);
  const [findCountries, setFindCountries] = useState("");

  useEffect(() => {
    countryService.all().then((data) => {
      setCountries(data);
    });
  }, []);

  /** @type {(e: React.ChangeEvent<HTMLInputElement>) => void} */
  const handleFilterCountries = (e) => setFindCountries(e.target.value);

  const getCountries = () => {
    const filtered = countries.filter((c) =>
      c.name.common.toLowerCase().includes(findCountries.toLowerCase()),
    );
    if (filtered.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (filtered.length > 1) {
      return (
        <>
          {filtered.map((c) => (
            <div>{c.name.common}</div>
          ))}
        </>
      );
    }
    const country = filtered.pop();
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

  return (
    <>
      <div className="input-group">
        <label htmlFor="findContries" className="form-label">
          Find countries
        </label>
        <input
          type="text"
          name="findCountries"
          value={findCountries}
          onChange={handleFilterCountries}
        />
      </div>
      <div className="table table-hover">{getCountries()}</div>
    </>
  );
}

export default App;
