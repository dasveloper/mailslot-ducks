import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import LoginForm from "../components/LoginForm";
import { login } from "../actions/account";
import blueMock from "../assets/images/blue-mock.png";
import pinkMock from "../assets/images/pink-mock.png";
import yellowMock from "../assets/images/yellow-mock.png";

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user, register } = this.props;
    const { account } = user;
    return (
      <div className="register-wrapper">
        <div className="register-left">
        <h1 className="register-header">Login to your account</h1>
          <LoginForm onSubmit={login} />
          {account ? (
            undefined
          ) : (
            <span className="register-toggle-prompt">
              Don't have an account?
              <Link className="register-toggle-link" to="/register">
                Sign up
              </Link>
            </span>
          )}
        </div>
        <div className="register-right">
          <img className="mock right" src={blueMock} />
          <img className="mock left" src={yellowMock} />
          <img className="mock" src={pinkMock} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ form, contactList, user }) {
  return {
    user,
    form,
    contactList
  };
}
const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
