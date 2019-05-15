import axios from "axios";
import Creators from "./actions";
import { history } from "../../App";
import { SubmissionError } from "redux-form";

const requestDashboardAction = Creators.requestDashboard;
const recieveDashboardAction = Creators.recieveDashboard;

const requestDeleteProductAction = Creators.requestDeleteProduct;
const recieveDeleteProductAction = Creators.recieveDeleteProduct;

const fetchDashboard = () => {
  return dispatch => {
    dispatch(requestDashboardAction());
    return axios
      .get("/account/getAll")
      .then(response => {
        let dashboardData = response.data;

        const subscribers = [].concat(
          ...dashboardData.products.map(({ subscribers }) => subscribers || [])
        );
        dashboardData.subscribers = subscribers;

        dispatch(recieveDashboardAction(dashboardData));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
const deleteProduct = productId => {
  return dispatch => {
    dispatch(requestDeleteProductAction());
    return axios
      .post("/product/delete", { productId: productId })
      .then(response => {
        dispatch(recieveDeleteProductAction(productId));
      })
      .catch(error => {
        console.log(error.response);
      });
  };
};

export default {
  fetchDashboard,
  deleteProduct
};
