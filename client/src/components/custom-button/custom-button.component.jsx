import React from "react";
import PropTypes from "prop-types";

// import "./custom-button.styles.scss";
import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({ children, ...otherProps }) => (
  <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
);
CustomButton.propTypes = {
  children: PropTypes.string.isRequired
};
export default CustomButton;
