import React, { useEffect, useState } from "react";
import countryService from "./services/countries";
import * as Types from "./types";
import Countries from "./components/Countries";

function App() {
  /** @type {Types.Country[]} */
  const initCountries = [];

  const [countries, setCountries] = useState(initCountries);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countryService.all().then((data) => {
      setCountries(data);
    });
  }, []);

  /** @type {(e: React.ChangeEvent<HTMLInputElement>) => void} */
  const handleFilterCountries = (e) => setFilter(e.target.value);

  const filterCountries = () =>
    countries.filter((c) =>
      c.name.common.toLowerCase().includes(filter.toLowerCase()),
    );

  return (
    <>
      <div className="input-group">
        <label htmlFor="findContries" className="form-label">
          Find countries
        </label>
        <input
          type="text"
          name="findCountries"
          value={filter}
          onChange={handleFilterCountries}
        />
      </div>
      <div className="table table-hover">
        <Countries countries={filterCountries()} />
      </div>
    </>
  );
}

export default App;
