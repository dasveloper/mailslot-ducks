import types from "./types.js";

const requestLogin = values => {
  return {
    type: types.REQUEST_LOGIN
  };
};
const recieveLogin = account => {
  return {
    type: types.RECIEVE_LOGIN,
    account: account
  };
};

export default {
    requestLogin,
  recieveLogin
};
