import types from "./types.js";

const requestDashboard = values => {
  return {
    type: types.REQUEST_DASHBOARD
  };
};
const recieveDashboard  = dashboardData => {
  return {
    type: types.RECIEVE_DASHBOARD,
    dashboardData: dashboardData
  };
};
const requestDeleteProduct = values => {
  return {
    type: types.REQUEST_DELETE_PRODUCT
  };
};
const recieveDeleteProduct = productId => {
  
  return {
    type: types.RECIEVE_DELETE_PRODUCT,
    productId: productId
  };
};
export default {
  requestDashboard,
  recieveDashboard,
  requestDeleteProduct,
  recieveDeleteProduct
};
