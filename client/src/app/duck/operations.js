import axios from "axios";
import Creators from "./actions";
import { history } from "../App";
import { SubmissionError } from "redux-form";

const requestFetchUserAction = Creators.requestFetchUser;
const recieveFetchUserAction = Creators.recieveFetchUser;

const fetchUser = args => {
  return dispatch => {
    dispatch(requestFetchUserAction());
    return axios
      .get("/account/current_user")
      .then(response => {
        const account = response.data;
        dispatch(recieveFetchUserAction(account));
      })
      .catch(error => {
        
        console.log(error.response);
      });
  };
};

const logout = () => {

  return dispatch => {
    return axios
      .get("/account/logout")
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  };
};
export default {
  fetchUser,
  logout
};
