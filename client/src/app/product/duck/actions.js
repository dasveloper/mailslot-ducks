import types from "./types.js";

const requestAddProduct = values => {
  return {
    type: types.REQUEST_ADD_PRODUCT
  };
};
const recieveAddProduct = account => {
  return {
    type: types.RECIEVE_ADD_PRODUCT,
    account: account
  };
};
const requestProduct = values => {
  return {
    type: types.REQUEST_PRODUCT
  };
};
const recieveProduct = productId => {
  return {
    type: types.RECIEVE_PRODUCT,
    product: productId
  };
};

export default {
    recieveAddProduct,
    requestAddProduct,
    requestProduct,
    recieveProduct
};
