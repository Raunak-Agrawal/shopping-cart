import React from "react";
import PropTypes from "prop-types";

import "./custom-button.styles.scss";

const CustomButton = ({
  children,
  inverted,
  signInWithGoogle,
  ...otherProps
}) => (
  <button
    className={`
    ${inverted ? "inverted" : ""}
    ${signInWithGoogle ? "sign-in-with-google" : ""} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);
CustomButton.propTypes = {
  children: PropTypes.string.isRequired,
  signInWithGoogle: PropTypes.bool,
  inverted: PropTypes.bool
};
export default CustomButton;
