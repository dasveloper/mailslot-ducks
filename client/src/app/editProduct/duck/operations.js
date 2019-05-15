import axios from "axios";
import Creators from "./actions";
import { history } from "../../App";
import { SubmissionError } from "redux-form";

const requestEditProductAction = Creators.requestEditProduct;
const recieveEditProductAction = Creators.recieveEditProduct;
const requestProductAction = Creators.requestProduct;
const recieveProductAction = Creators.recieveProduct;

const fetchProduct = (company, product) => {
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

const editProduct = ({ _id, cover, productFile, name, title, description }) => {
  return dispatch => {
    dispatch(requestEditProductAction());
    const data = new FormData();
    if (!_id) {
      throw new SubmissionError({
        _error: { message: "Something went wrong, please try again" }
      });
    }
    data.append("productId", _id);

    if (name) {
      data.append("name", name);
    }
    if (productFile) {
      data.append("productFile", productFile[0]);
    }
    if (cover) {
      data.append("cover", cover[0]);
    }

    if (title) {
      data.append("title", title);
    }
    if (description) {
      data.append("description", description);
    }
    return axios
      .post("/product/edit", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`
        }
      })
      .then(response => {
        const product = response.data;
        dispatch(recieveEditProductAction(product));

        history.push("/dashboard");
      })
      .catch(error => {
        console.log(error.response);
        dispatch(recieveEditProductAction());

        throw new SubmissionError({
          _error: error.response.data
        });
      });
  };
};

export default {
  editProduct,
  fetchProduct
};
