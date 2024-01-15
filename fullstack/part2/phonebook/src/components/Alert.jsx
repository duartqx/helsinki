import * as Types from "../types";
import React from "react";

const alertTypes = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "info",
  light: "light",
  dark: "dark",
};

/**
 * @param {Object} props
 * @param {Types.StatusObject} props.alertObj
 **/
const Alert = ({ alertObj }) => {
  return (
    <div className="px-5">
      <div className={`alert alert-${alertObj.status} col-md-12`} role="alert">
        {alertObj.message}
      </div>
    </div>
  );
};

export default Alert;
