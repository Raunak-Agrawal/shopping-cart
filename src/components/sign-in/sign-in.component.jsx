import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import PropTypes from "prop-types";

import "./sign-in.styles.scss";
import {
  googleSignInStart,
  emailSignInStart
} from "../../redux/user/user.actions";
import { connect } from "react-redux";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  static propTypes = {
    emailSignInStart: PropTypes.func,
    googleSignInStart: PropTypes.func
  };
  handleSubmit = async event => {
    event.preventDefault();
    let { emailSignInStart } = this.props;
    let { email, password } = this.state;
    emailSignInStart(email, password);
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    let { googleSignInStart } = this.props;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
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
          <div className="buttons">
            <CustomButton type="submit"> Sign in </CustomButton>
            <CustomButton
              type="button"
              onClick={googleSignInStart}
              signInWithGoogle
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});
export default connect(
  null,
  mapDispatchToProps
)(SignIn);
