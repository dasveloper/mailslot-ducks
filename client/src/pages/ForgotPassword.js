import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";


import {
  login,
  register,
  forgotPassword,
  clearResetMessage
} from "../actions/account";
import ForgotPasswordForm from "../components/ForgotPassword";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: true
    };
  }
  componentWillUnmount() {
    const { clearResetMessage } = this.props;

    clearResetMessage();
  }
  componentDidMount() {
    const { pathname } = this.props.location;
    const isLoginPage = pathname === "/login";
    this.setState({ showLoginForm: isLoginPage });
  }

  render() {
    const { user, forgotPassword, clearResetMessage } = this.props;
    const { resetMessage } = user;

    return (
      <div className="container-inner center">
        <ForgotPasswordForm message={resetMessage} onSubmit={forgotPassword} />
        <Card fluid raised>
          <div className="register-toggle">
            <span className="register-toggle-prompt">
              Already have an account
              <Link className="register-toggle-link" to="/login">
                Login
              </Link>
            </span>
          </div>
        </Card>
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
  forgotPassword,
  clearResetMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
