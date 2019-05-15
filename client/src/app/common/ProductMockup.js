import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Field, reduxForm, change } from "redux-form";

const customEmailInput = field => {
  return (
    <div className="product-mockup-email-wrapper">
      <input
        type="email"
        disabled={field.disableEmail}
        placeholder="Email address"
        className="product-mockup-email-input"
        {...field.input}
      />
      <button
        type="submit"
        className="product-mockup-email-submit"
        style={{
          backgroundColor: field.brandColor
        }}
      >
        <FiArrowRight className="product-mockup-email-submit-icon" />
      </button>
    </div>
  );
};
const ProductMockup = ({
  brandColor = null,
  logo = null,
  cover = null,
  title = null,
  description = null,
  productId = null,
  disableEmail = true,
  handleSubmit,
  successOverlay = false,
  error
}) => {
  return (
    <div className="product-mockup-wrapper">
      <div
        className="product-mockup-logo"
        style={{
          backgroundImage: logo ? `url(${logo})` : "none"
        }}
      />
      <div className="product-mockup-card">
       {successOverlay && <div className="success-overlay">
          <FiCheckCircle className="icon success-icon" />

          <h2 className="success-header">Success!</h2>
          <p className="success-message">
            A download link has been sent <br/>to the email you provided
          </p>
        </div>}
        <div
          className="product-mockup-brand-color"
          style={{
            backgroundColor: brandColor
          }}
        />
        <div
          className="product-mockup-image"
          style={{
            backgroundImage: cover ? `url(${cover})` : "none"
          }}
        />
        <h2 className="product-mockup-title">
          {title || "Add a product title"}
        </h2>
        <p className="product-mockup-description">
          {description || "Add a description"}
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <Field
            className="form-input"
            component="input"
            name="productId"
            type="hidden"
          />
          <Field
            className="form-input"
            component={customEmailInput}
            brandColor={brandColor}
            name="email"
            disableEmail={disableEmail}
            type="email"
          />
          {error && (
            <div className="form-row">
              <p className="form-error">{error.message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "product-subscribe", //                 <------ same form name
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(ProductMockup);
