import React, { useEffect, useState } from "react";
import countryService from "./services/countries";
import * as Types from "./types";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState(
    /** @type {Types.Country[]} */ ([]),
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countryService.all().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const filterCountries = () => {
    const firstPass = countries.filter((c) =>
      c.name.common.toLowerCase().includes(filter.toLowerCase()),
    );
    const secondPass = firstPass.filter(
      (c) => c.name.common.toLowerCase() === filter.toLowerCase(),
    );
    return secondPass.length ? secondPass : firstPass;
  };

  return (
    <main>
      <div className="input-group">
        <label htmlFor="findContries" className="form-label">
          Find countries
        </label>
        <input
          type="text"
          className="form-control"
          name="findCountries"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="table table-hover">
        <Countries
          countries={filterCountries()}
          setSetFilter={(name) => () => setFilter(name)}
        />
      </div>
    </main>
  );
}

export default App;
