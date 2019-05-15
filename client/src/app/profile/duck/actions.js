import types from "./types.js";

const requestUpdateProfile = values => {
  return {
    type: types.REQUEST_UPDATE_PROFILE
  };
};
const recieveUpdateProfile = account => {
  return {
    type: types.RECIEVE_UPDATE_PROFILE,
    account: account
  };
};

export default {
    recieveUpdateProfile,
    requestUpdateProfile
};
