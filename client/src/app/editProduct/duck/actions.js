import types from "./types.js";

const requestEditProduct = values => {
  return {
    type: types.REQUEST_EDIT_PRODUCT
  };
};
const recieveEditProduct = account => {
  return {
    type: types.RECIEVE_EDIT_PRODUCT,
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
    recieveEditProduct,
    requestEditProduct,
    requestProduct,
    recieveProduct
};
