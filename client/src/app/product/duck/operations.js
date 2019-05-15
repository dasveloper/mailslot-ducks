import axios from "axios";
import Creators from "./actions";
import { history } from "../../App";
import { SubmissionError } from "redux-form";

const requestAddProductAction = Creators.requestAddProduct;
const recieveAddProductAction = Creators.recieveAddProduct;
const requestProductAction = Creators.requestProduct;
const recieveProductAction = Creators.recieveProduct;

const fetchProduct = (company, product ) => {
  return dispatch => {
    dispatch(requestProductAction());

    return axios
      .get("/product/get", {
        params: {
          company,
          product
        }
      })
      .then(response => {
        const product = response.data;
        dispatch(recieveProductAction(product));
      })
      .catch(error => {
        console.log(error.response);
        dispatch(recieveProductAction());
      });
  };
};

const addProduct = ({ cover, productFile, name, title, description }) => {
  return dispatch => {
    dispatch(requestAddProductAction());
    const data = new FormData();
    if (!name) {
      throw new SubmissionError({
        _error: { message: "Please provide a name for your product" }
      });
    }
    if (!productFile) {
      throw new SubmissionError({
        _error: { message: "Please upload your product file" }
      });
    }
    if (!cover) {
      throw new SubmissionError({
        _error: { message: "Please provide a cover photo for your product" }
      });
    }

    if (!title) {
      throw new SubmissionError({
        _error: { message: "Please provide a product title" }
      });
    }
    if (!description) {
      throw new SubmissionError({
        _error: { message: "Please provide a description for your product" }
      });
    }
    data.append("cover", cover[0]);
    data.append("productFile", productFile[0]);
    data.append("name", name);
    data.append("title", title);
    data.append("description", description);

    return axios
      .post("/product/create", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`
        }
      })
      .then(response => {
        const product = response.data;
        dispatch(recieveAddProductAction(product));

        history.push("/dashboard");
      })
      .catch(error => {
        console.log(error.response);
        dispatch(recieveAddProductAction());

        throw new SubmissionError({
          _error: error.response.data
        });
      });
  };
};

export default {
  addProduct,
  fetchProduct
};
