import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import PropTypes from "prop-types";

import "./sign-up.styles.scss";
import { signupStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const SignUp = ({ signupStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { email, displayName, password, confirmPassword } = userCredentials;
  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    signupStart({ email, displayName, password });
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2>I do not have an account</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="displayName"
          type="text"
          handleChange={handleChange}
          value={displayName}
          label="Display name"
          required
        />
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <FormInput
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          handleChange={handleChange}
          label="confirm password"
          required
        />
        <CustomButton type="submit"> Sign up </CustomButton>
      </form>
    </div>
  );
};
SignUp.propTypes = {
  signupStart: PropTypes.func
};
const mapDispatchToProps = dispatch => ({
  signupStart: userCredentials => dispatch(signupStart(userCredentials))
});
export default connect(
  null,
  mapDispatchToProps
)(SignUp);
