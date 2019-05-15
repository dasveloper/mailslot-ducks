import React, { Component } from "react";
import { Field, reduxForm, change } from "redux-form";
import { Button, Card, Input } from "semantic-ui-react";
import { SketchPicker } from "react-color";
import { formValueSelector } from "redux-form"; // ES6
const selector = formValueSelector("profile-form");

const customFileInput = field => {
  delete field.input.value; // <-- just delete the value property
  return (
    <label className="btn btn-default ">
      Upload
      <input className="file-upload" type="file" id="file" {...field.input} />
    </label>
  );
};
class ProfileFormComponent extends Component {
  state = {
    displayColorPicker: false
  };
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.props.dispatch(change("profile-form", "brandColor", color.hex));
  };
  render() {
    const {
      handleSubmit,
      pristine,
      previousPage,
      submitting,
      error,
      brandColor,
      logo,
      account
    } = this.props;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <Field
            component="input"
            name="companyName"
            placeholder="Company Name"
            type="text"
            disabled={!!account.companyName}
            className="form-input"
          />
        </div>
        <h4 className="form-row-header">Upload a logo:</h4>

        <div className="form-row">
          <div className="form-col">
            <div className="form-sub-row">
              <Field
                component={customFileInput}
                name="logo"
                placeholder="Logo"
                type="text"
                className="form-input"
              />
              {logo && <span className="file-name">{logo[0].name}</span>}
            </div>
            <div className="form-sub-row">
            <span className="file-requirements">Single image .PNG .JPG, max size 1MB</span>
            </div>
          </div>
        </div>
        <h4 className="form-row-header">Choose a brand color:</h4>

        <div className="form-row">
          <div className="swatch" onClick={this.handleClick}>
            <div className="color" style={{ backgroundColor: brandColor }} />
          </div>
          {this.state.displayColorPicker ? (
            <div className="popover">
              <div className="cover" onClick={this.handleClose} />
              <SketchPicker color={brandColor} onChange={this.handleChange} />
            </div>
          ) : null}
        </div>
        <div className="form-row">
          <Field
            component="input"
            name="brandColor"
            placeholder="Brand Color"
            type="hidden"
            className="form-input"
          />
        </div>
        {error && (
          <div className="form-row">
            <p className="form-error">{error.message}</p>
          </div>
        )}
        <div className="form-row">
          <Button className="btn btn-primary btn-block" type="submit">
            Create Profile
          </Button>
        </div>
      </form>
    );
  }
}


export default reduxForm({
  form: "profile-form", //                 <------ same form name
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  initialValues: {
    companyName: null,
    logo: null,
    brandColor: "#fff"
  }
  
})(ProfileFormComponent);
