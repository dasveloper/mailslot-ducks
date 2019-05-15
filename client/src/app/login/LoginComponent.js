import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoginFormContainer from "./LoginFormContainer";
import blueMock from "../../assets/images/blue-mock.png";
import pinkMock from "../../assets/images/pink-mock.png";
import yellowMock from "../../assets/images/yellow-mock.png";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { login } = this.props;

    return (
      <div className="login-wrapper">
        <div className="login-left">
          <h1 className="login-header">Login to your account</h1>
          <LoginFormContainer />

          <span className="login-toggle-prompt">
            Already have an account?
            <Link className="login-toggle-link" to="/register">
              Register
            </Link>
          </span>
        </div>
        <div className="login-right">
          <img className="mock right" src={blueMock} />
          <img className="mock left" src={yellowMock} />
          <img className="mock" src={pinkMock} />
        </div>
      </div>
    );
  }
}


export default LoginComponent;
