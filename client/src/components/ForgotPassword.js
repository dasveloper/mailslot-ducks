import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Card, Input } from "semantic-ui-react";
import validate from "../helpers/validate";

const LoginForm = props => {
  const { handleSubmit, pristine, previousPage, submitting ,error,message} = props;
  return (
    <Card fluid className="card-wrapper" raised>
      <form className="card-inner" onSubmit={handleSubmit}>
      <div className="card-row">
          <span className="card-subheader">
            Enter your email address and we'll send you a link to reset your password.
          </span>
      </div>
        <div className="card-row">
          <Field
            className="card-field"
            icon="envelope"
            iconPosition="left"
            size="big"
            component="input"
            name="forgotEmail"
            placeholder="Email"
            type="email"
          />
        </div>
        {message && (
          <div className="card-row">
            <p className="form-success">{message}</p>
          </div>
        )}
        {error && (
          <div className="card-row">
            <p className="form-error">{error.message}</p>
          </div>
        )}
        <div className="card-row">
          <Button className="card-button" type="submit" fluid size="large">
            Send reset email
          </Button>
        </div>       
      </form>
    </Card>
  );
};

export default reduxForm({
  form: "forgotPassword", //                 <------ same form name
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(LoginForm);
