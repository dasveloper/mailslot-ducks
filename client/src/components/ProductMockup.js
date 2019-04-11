import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

class ProductMockup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverPhoto: null
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.cover !== prevProps.cover) {
      const { cover } = this.props;

      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          coverPhoto: reader.result
        });
      };
      if (!!cover) reader.readAsDataURL(cover[0]);
    }
  }

  render() {
    const { brandColor, logo, title, description, cover } = this.props;
    const { coverPhoto } = this.state;
    console.log(coverPhoto);
    return (
      <div className="product-mockup-wrapper">
        <div
          className="product-mockup-logo"
          style={{
            backgroundImage: logo
              ? `url(https://s3.amazonaws.com/mailslot/${logo})`
              : "none"
          }}
        />
        <div className="product-mockup-card">
          <div
            className="product-mockup-brand-color"
            style={{
              backgroundColor: brandColor
            }}
          />
          <div
            className="product-mockup-image"
            style={{
              backgroundImage: logo ? `url(${coverPhoto})` : "none"
            }}
          />
          <h2 className="product-mockup-title">
            {title || "Add a product title"}
          </h2>
          <p className="product-mockup-description">
            {description || "Add a description"}
          </p>
          <div className="product-mockup-email-wrapper">
            <input
              type="email"
              placeholder="Email address"
              className="product-mockup-email-input"
            />
            <button
              type="submit"
              className="product-mockup-email-submit"
              style={{
                backgroundColor: brandColor
              }}
            >
              <FiArrowRight className="product-mockup-email-submit-icon" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductMockup;
