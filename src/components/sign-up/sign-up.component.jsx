import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import PropTypes from "prop-types";

import "./sign-up.styles.scss";
import { signupStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

class SignUp extends React.Component {
  static propTypes = {
    signupStart: PropTypes.func
  };
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, displayName, password, confirmPassword } = this.state;
    let { signupStart } = this.props;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    signupStart({ email, displayName, password });
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-up">
        <h2>I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            handleChange={this.handleChange}
            value={this.state.displayName}
            label="Display name"
            required
          />
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <FormInput
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            handleChange={this.handleChange}
            label="confirm password"
            required
          />
          <CustomButton type="submit"> Sign up </CustomButton>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  signupStart: userCredentials => dispatch(signupStart(userCredentials))
});
export default connect(
  null,
  mapDispatchToProps
)(SignUp);
