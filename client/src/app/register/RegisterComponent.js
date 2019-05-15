import React, { Component } from "react";
import { Link } from "react-router-dom";
import RegisterFormContainer from "./RegisterFormContainer";
import blueMock from "../../assets/images/blue-mock.png";
import pinkMock from "../../assets/images/pink-mock.png";
import yellowMock from "../../assets/images/yellow-mock.png";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { register } = this.props;

    return (
      <div className="register-wrapper">
        <div className="register-left">
          <h1 className="register-header">Register your account</h1>
          <RegisterFormContainer />

          <span className="register-toggle-prompt">
            Already have an account?
            <Link className="register-toggle-link" to="/login">
              Login
            </Link>
          </span>
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

// function mapStateToProps({ form, contactList, user }) {
//   return {
//     user,
//     form,
//     contactList
//   };
// }
// const mapDispatchToProps = {
//   register
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Register);

export default RegisterComponent;
