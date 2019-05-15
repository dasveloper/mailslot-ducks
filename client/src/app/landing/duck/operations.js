import axios from "axios";
import Creators from "./actions";
import { history } from "../../App";
import { SubmissionError } from "redux-form";

const requestLandingAction = Creators.requestLanding;
const recieveLandingAction = Creators.recieveLanding;

const fetchLanding = (company, product) => {
  return dispatch => {
    dispatch(requestLandingAction());
    return axios
      .get("/product/get", {
        params: {
          company,
          product
        }
      })
      .then(response => {
        const landingData = response.data;
        dispatch(recieveLandingAction(landingData));
      })
      .catch(error => {
        console.log(error.response);
      });
  };
};

const requestSubscribeAction = Creators.requestSubscribe;
const recieveSubscribeAction = Creators.recieveSubscribe;

const subscribe = ({email, productId}) => {
  return dispatch => {
    dispatch(requestSubscribeAction());
    return axios
      .post("/product/subscribe", {
       email, productId
      })
      .then(response => {
        const subscribeData = response.data;
        dispatch(recieveSubscribeAction(subscribeData));
      })
      .catch(error => {
        console.log(error.response);
      });
  };
};

export default {
  fetchLanding,
  subscribe
};
