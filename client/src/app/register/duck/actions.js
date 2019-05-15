import types from "./types.js";

const requestRegister = values => {
  return {
    type: types.REQUEST_REGISTER
  };
};
const recieveRegister = account => {
  return {
    type: types.RECIEVE_REGISTER,
    account: account
  };
};

export default {
    requestRegister,
  recieveRegister
};
