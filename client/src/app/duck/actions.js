import types from "./types.js";
const requestFetchUser = values => {
  return {
    type: types.REQUEST_FETCH_USER
  };
};
const recieveFetchUser = account => {
  return {
    type: types.RECIEVE_FETCH_USER,
    account: account
  };
};
export default {
  requestFetchUser,
  recieveFetchUser
};
