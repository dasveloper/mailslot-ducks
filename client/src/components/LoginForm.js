import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Card, Input } from "semantic-ui-react";
import validate from "../helpers/validate";

const LoginForm = props => {
  const { handleSubmit, pristine, previousPage, submitting, error } = props;
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <Field
          className="form-input"
          component="input"
          name="loginEmail"
          placeholder="Email"
          type="email"
        />
      </div>
      <div className="form-row">
        <Field
          className="form-input"
          component="input"
          name="loginPassword"
          placeholder="Password"
          type="password"
        />
      </div>

      {error && (
        <div className="form-row">
          <p className="form-error">{error.message}</p>
        </div>
      )}
      <div className="form-row">
        <Button
          className="btn btn-primary btn-block"
          type="submit"
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "login", //                 <------ same form name
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(LoginForm);
