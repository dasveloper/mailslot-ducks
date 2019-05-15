import axios from "axios";
import Creators from "./actions";
import { history } from "../../App";
import { SubmissionError } from "redux-form";

const requestRegisterAction = Creators.requestRegister;
const recieveRegisterAction = Creators.recieveRegister;

const register = args => {
  return dispatch => {
    dispatch(requestRegisterAction());
    return axios
      .post("/account/register", {
        ...args
      })
      .then(response => {
        const account = response.data;
        dispatch(recieveRegisterAction(account));

        history.push("/updateProfile");

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
    register
};
