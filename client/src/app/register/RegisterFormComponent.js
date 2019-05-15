import React from "react";
import { Field, reduxForm } from "redux-form";

const RegisterForm = props => {
  const { handleSubmit, pristine, previousPage, submitting, error } = props;
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <Field
          className="form-input"
          component="input"
          name="registerEmail"
          placeholder="Email"
          type="email"
        />
      </div>
      <div className="form-row">
        <Field
          className="form-input"
          component="input"
          name="registerPassword"
          placeholder="Password"
          type="password"
        />
      </div>
      <div className="form-row">
        <Field
          className="form-input"
          component="input"
          name="registerConfirmPassword"
          placeholder="Confirm password"
          type="password"
        />
      </div>
      {error && (
        <div className="form-row">
          <p className="form-error">{error.message}</p>
        </div>
      )}
      <div className="form-row">
        <button
          className="btn btn-primary btn-block"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "register", //                 <------ same form name
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(RegisterForm);
