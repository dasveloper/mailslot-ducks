import axios from "axios";
import { SubmissionError } from "redux-form";
import { history } from "../App";

import { FETCH_USER,  RESET_LINK_MESSAGE,REGISTRATION_FAILED } from "./types";
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/account/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};
export function login(args) {
  return async dispatch => {
    // Initiate loading state
    // dispatch({
    // type: ADD_CONTACT_LIST_USER
    // });
    try {
      return axios
        .post("/account/login", {
          ...args
        })
        .then(response => {
          dispatch({
            type: FETCH_USER,
            payload: response.data
          });
        })
        .catch(error => {
          throw new SubmissionError({
            _error: error.response.data
          });
        });

      // Update payload in reducer on success
    } catch (err) {
      // Update error in reducer on failure
      // dispatch({
      //   type: 'FETCH_SEARCH_FAILURE',
      // error: err
      //  });
    }
  };
}

export function register(args) {
  return async dispatch => {
    // Initiate loading state
    // dispatch({
    // type: ADD_CONTACT_LIST_USER
    // });
    try {
      // Call the API
      // const result = await fetchSearchData(args.pageCount, args.itemsPerPage);
      return axios
        .post("/account/register", {
          ...args
        })
        .then(response => {
          dispatch({
            type: FETCH_USER,
            payload: response.data
          });
          history.push("/createProfile");

        })
        .catch(error => {
          throw new SubmissionError({
            _error: error.response.data
          });
        });
    } catch (err) {
      // Update error in reducer on failure
      // dispatch({
      //   type: 'FETCH_SEARCH_FAILURE',
      // error: err
      //  });
    }
  };
}

export function forgotPassword(args) {
  return async dispatch => {
    // Initiate loading state
    // dispatch({
    // type: ADD_CONTACT_LIST_USER
    // });
    try {
      // Call the API
      // const result = await fetchSearchData(args.pageCount, args.itemsPerPage);
      return axios
        .post("/account/forgotPassword", {
          ...args
        })
        .then(response => {
          dispatch({
            type: RESET_LINK_MESSAGE,
            payload: response.data
          });
        })
        .catch(error => {
          throw new SubmissionError({
            _error: error.response.data
          });
        });
    } catch (err) {
      // Update error in reducer on failure
      // dispatch({
      //   type: 'FETCH_SEARCH_FAILURE',
      // error: err
      //  });
    }
  };
}

export const clearResetMessage = () => {
  return {
    type: "CLEAR_RESET_SUCCESS"
  };
};



export function updateProfile(args) {
  console.log("IN");
  return async dispatch => {
    try {
      // Call the API
      // const result = await fetchSearchData(args.pageCount, args.itemsPerPage);
      const data = new FormData();
      data.append("logo", args.logo[0]);
      data.append("companyName", args.companyName);
      data.append("brandColor", args.brandColor);
      return axios
        .post("/account/updateProfile", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
          }
        })
        .then(response => {
          dispatch({
            type: "khk",
            payload: response.data
          });
          history.push("/dashboard");
        })
        .catch(error => {
          throw new SubmissionError({
            _error: error.response.data
          });
        });
    } catch (err) {
      // Update error in reducer on failure
      // dispatch({
      //   type: 'FETCH_SEARCH_FAILURE',
      // error: err
      //  });
    }
  };
}
