import React from "react";
import * as Types from "../types";

/**
 * @param {Object} props
 * @param {Types.InputChangeEvent} props.onChange
 * @param {string} props.value
 **/
const FilterPersons = ({ onChange, value }) => {
  return (
    <div>
      filter shown with <input type="text" onChange={onChange} value={value} />
    </div>
  );
};

export default FilterPersons;
