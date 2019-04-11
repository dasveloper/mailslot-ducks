import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";
import CreateProfileForm from "../components/CreateProfileForm";
import ProfileMockup from "../components/ProfileMockup";
import { updateProfile } from "../actions/account";

class Register extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    const { updateProfile, form } = this.props;
    const { createprofile } = form;
    return (
      <div className="register-wrapper">
        <div className="register-left">
        <h1 className="register-header">Create your company profile</h1>

          <CreateProfileForm onSubmit={updateProfile} />
        </div>
        <div className="register-right">
          {createprofile && <ProfileMockup profile={createprofile.values} />}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ form }) {
  return {
    form
  };
}
const mapDispatchToProps = {
  updateProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
