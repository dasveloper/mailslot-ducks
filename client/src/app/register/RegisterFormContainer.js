import { connect } from "react-redux";
import RegisterFormComponent from "./RegisterFormComponent";

import { registerOperations } from "./duck";

const mapStateToProps = state => {
  const { form, register } = state.register;
  return { form };
};

const mapDispatchToProps = dispatch => {
  const register = values => {
    return dispatch(registerOperations.register(values));
  };

  return { onSubmit:  register };
};

const RegisterFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterFormComponent);

export default RegisterFormContainer;
