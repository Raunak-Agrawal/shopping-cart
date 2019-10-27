/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";
const WithSpinner = WrappedComponnet => ({ isLoading, ...props }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer></SpinnerContainer>
    </SpinnerOverlay>
  ) : (
    <WrappedComponnet {...props} />
  );
};

export default WithSpinner;
