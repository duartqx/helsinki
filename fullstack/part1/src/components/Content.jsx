import React from "react";

/**
 * @typedef {Object} ContentObject
 * @property {string} title
 * @property {number} quantity
 **/

/**
 * @typedef {Object} ContentProps
 * @property {ContentObject[]} contentObjects
 **/

/**
 * @param {ContentProps} props
 **/
const Content = ({ contentObjects }) => (
  <>
    {contentObjects.map((obj) => (
      <p>
        {obj.title} {obj.quantity}
      </p>
    ))}
  </>
);

export default Content;
