import React from "react";
import * as Types from "../types";

/**
 * @param {Object} props
 * @param {Types.PhoneBookInputValue} props.input
 **/
const PhoneBookInput = ({ input }) => {
  return (
    <div className="mb-3">
      <label htmlFor={input.label} className="form-label">{input.label}</label>
      <input name={input.label} type="text" value={input.value} onChange={input.onChange} className="form-control" />
    </div>
  );
};

/**
 * @param {Object} props
 * @param {React.FormEventHandler} props.onSubmit
 * @param {Types.PhoneBookInputValue[]} props.parts
 **/
const PhoneBookForm = ({ onSubmit, parts }) => {
  return (
    <form onSubmit={onSubmit} className="col-md-12 px-5">
        {parts.map((p) => (
          <PhoneBookInput input={p} key={`phonebook_input_${p.label}`} />
        ))}
        <div className="col-md-4 mb-3">
          <button type="submit" className="btn btn-sm btn-primary">add</button>
        </div>
    </form>
  );
};

export default PhoneBookForm;
