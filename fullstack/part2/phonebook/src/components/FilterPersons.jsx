import React from "react";
import * as Types from "../types";

/**
 * @param {Object} props
 * @param {Types.InputChangeEvent} props.onChange
 * @param {string} props.value
 **/
const FilterPersons = ({ onChange, value }) => {
  return (
    <div className="px-5">
      <div className="mb-3">
        <label htmlFor="filter" className="form-label">filter shown with</label>
        <input name="filter" type="text" onChange={onChange} value={value} className="form-control" />
      </div>
    </div>
  );
};

export default FilterPersons;
