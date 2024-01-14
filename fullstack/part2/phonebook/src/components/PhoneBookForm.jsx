import React from "react";
import * as Types from "../types";

/**
 * @param {Object} props
 * @param {Types.PhoneBookInputValue} props.input
 **/
const PhoneBookInput = ({ input }) => {
  return (
    <div>
      {input.label}:{" "}
      <input type="text" value={input.value} onChange={input.onChange} />
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
    <form onSubmit={onSubmit}>
      {parts.map((p) => (
        <PhoneBookInput input={p} key={`phonebook_input_${p.label}`} />
      ))}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PhoneBookForm;
