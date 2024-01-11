import React from "react";

/**
 * @typedef {Object} ButtonProps
 * @property {React.MouseEventHandler} [handleClick]
 * @property {number} [value]
 * @property {string} text
 **/

/**
 * @param {ButtonProps} props
 **/
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

/**
 * @typedef {Object} ButtonsProps
 * @property {ButtonProps[]} buttons
 **/

/**
 * @param {ButtonsProps} props
 **/
const Buttons = ({ buttons }) => {
  return (
    <>
      {buttons.map(
        (b, idx) =>
          b.handleClick && (
            <Button
              handleClick={b.handleClick}
              text={b.text}
              key={`Buttons_key_${idx}`}
            />
          ),
      )}
    </>
  );
};

export default Buttons;
