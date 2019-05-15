import axios from "axios";
import Creators from "./actions";
import { history } from "../../App";
import { SubmissionError } from "redux-form";

const requestUpdateProfileAction = Creators.requestUpdateProfile;
const recieveUpdateProfileAction = Creators.recieveUpdateProfile;

const updateProfile = ({ logo, companyName, brandColor }) => {
  console.log(logo, companyName, brandColor);
  return dispatch => {
    dispatch(requestUpdateProfileAction());
    const data = new FormData();

    if (companyName) {
      data.append("companyName", companyName);
    }
    if (logo) {
      data.append("logo", logo[0]);
    }
    if (brandColor) {
      data.append("brandColor", brandColor);
    }

    return axios
      .post("/account/updateProfile", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`
        }
      })
      .then(response => {
        const account = response.data;
        dispatch(recieveUpdateProfileAction(account));
        if (account.companyName && account.brandColor && account.logo)
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
  updateProfile
};
