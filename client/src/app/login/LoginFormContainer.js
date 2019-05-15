import { connect } from "react-redux";
import LoginFormComponent from "./LoginFormComponent";

import { loginOperations } from "./duck";

const mapStateToProps = state => {
  const { form, login } = state.login;
  return { form };
};

const mapDispatchToProps = dispatch => {
  const login = values => {
    return dispatch(loginOperations.login(values));
  };

  return { onSubmit:  login };
};

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);

export default LoginFormContainer;
