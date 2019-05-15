import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileFormContainer from "./ProfileFormContainer";
import ProfileMockup from "../common/ProfileMockup";
import { AWSUrlPrefix} from '../constants'

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: null
    };
  }
  loadImagePreview(image) {
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(image[0]);
  }

  componentDidUpdate(prevProps, prevState) {
    const {logo} = this.props;
    if (logo !== prevProps.logo && !!logo) {
      console.log(logo)
      if (typeof(logo)==='object') this.loadImagePreview(logo);
      else this.setState({
        imagePreviewUrl: AWSUrlPrefix + logo
      });
    }
  }
  render() {
    const { brandColor, account } = this.props;
    const { imagePreviewUrl } = this.state;
    return (
      <div className="register-wrapper">
        <div className="register-left">
          <h1 className="register-header">Create your company profile</h1>

          <ProfileFormContainer  initialValues={{ ...account }} />
        </div>
        <div className="register-right">
          <ProfileMockup brandColor={brandColor} logo={imagePreviewUrl} />
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
