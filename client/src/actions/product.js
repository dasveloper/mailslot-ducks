import axios from "axios";
import { SubmissionError } from "redux-form";
import { history } from "../App";

import { FETCH_USER,  RESET_LINK_MESSAGE,REGISTRATION_FAILED } from "./types";



export function createProduct(args) {
    console.log(args)
  return async dispatch => {
    try {
      // Call the API
      // const result = await fetchSearchData(args.pageCount, args.itemsPerPage);
      const data = new FormData();
      data.append("cover", args.cover[0]);
      data.append("name", args.name);
      data.append("title", args.title);
      data.append("description", args.description);


      return axios
        .post("/product/create", data, {
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
