import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileMockup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: null,
      brandColor: "#fff"
    };
  }
  componentDidUpdate(prevProps, prevState) {
  

    if (this.props.profile.logo !== prevProps.profile.logo) {
      const { logo, brandColor } = this.props.profile;
      console.log(logo)
      this.setState({
        brandColor: brandColor
      });
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: reader.result
        });
      };
      console.log(logo);
      if (!!logo[0]) reader.readAsDataURL(logo[0]);
    }
  }
  render() {
    const { imagePreviewUrl } = this.state;
    const { brandColor } = this.props.profile;

    console.log(brandColor);

    return (
      <div className="mockup-wrapper">

        <div
          className="mockup-logo"
          style={{
            backgroundImage: imagePreviewUrl
              ? `url(${imagePreviewUrl})`
              : "none"
          }}
        />
        <div className="mockup-card">
        <div
          className="mockup-brand-color"
          style={{
            backgroundColor: brandColor
          }}
        />
          <div className="mockup-image" />
        </div>
      </div>
    );
  }
}
export default ProfileMockup;
