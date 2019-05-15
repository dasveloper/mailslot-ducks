import { connect } from "react-redux";
import ProfileFormComponent from "./ProfileFormComponent";

import { profileOperations } from "./duck";
import { formValueSelector } from "redux-form"; // ES6
const selector = formValueSelector("profile-form");

const mapStateToProps = state => {
  const { account} = state.app;

  return {
    account: account,
    brandColor: selector(state, "brandColor"),
    logo: selector(state, "logo")
  };
};
const mapDispatchToProps = dispatch => {
  const updateProfile = values => {
    return dispatch(profileOperations.updateProfile(values));
  };

  return { onSubmit: updateProfile };
};

const ProfileFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileFormComponent);

export default ProfileFormContainer;

