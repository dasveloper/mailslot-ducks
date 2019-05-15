
import { connect } from 'react-redux';
import { registerOperations } from './duck';
import ProfileComponent from './ProfileComponent';
import { formValueSelector } from "redux-form"; // ES6
import {getFormValues} from 'redux-form';

const selector = formValueSelector("profile-form");


const mapStateToProps = state => {
     const{account} = state.app;
    return {
      brandColor: selector(state, "brandColor"),
      logo: selector(state, "logo"),
      account
    };
  };
const mapDispatchToProps = dispatch => {
  return {
  }
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);

export default ProfileContainer;
