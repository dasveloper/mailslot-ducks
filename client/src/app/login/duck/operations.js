import axios from "axios";
import Creators from "./actions";
import { history } from "../../App";
import { SubmissionError } from "redux-form";

const requestLoginAction = Creators.requestLogin;
const recieveLoginAction = Creators.recieveLogin;

const login = args => {
  return dispatch => {
    dispatch(requestLoginAction());
    return axios
      .post("/account/login", {
        ...args
      })
      .then(response => {
        const account = response.data;
        dispatch(recieveLoginAction(account));

        history.push("/dashboard");

      })
      .catch(error => {
          console.log(error.response);
        throw new SubmissionError({
          _error: error.response.data
        });
      });
  };
};

export default {
    login
};
