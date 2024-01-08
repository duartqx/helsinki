import React from "react";

/**
 * @typedef {Object} PartProps
 * @property {string} title
 * @property {number} quantity
 **/

/**
 * @param {PartProps} props
 **/
const Part = ({ title, quantity }) => (
  <p>
    {title} {quantity}
  </p>
);

/**
 * @typedef {Object} ContentProps
 * @property {PartProps[]} parts
 **/

/**
 * @param {ContentProps} props
 **/
const Content = ({ parts }) => (
  <>
    {parts.map((obj) => (
      <Part title={obj.title} quantity={obj.quantity} />
    ))}
  </>
);

export default Content;
