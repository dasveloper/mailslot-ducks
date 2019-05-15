
import types from './types';

const INITIAL_STATE = {
  showLoader: false,
  product: null
}
const editProductReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case types.REQUEST_EDIT_PRODUCT: {
      return {
        ...state,
        showLoader: true
      }
    }
    
    case types.RECIEVE_EDIT_PRODUCT: {
      return {
        ...state,
        showLoader: false
      }
    }
    case types.REQUEST_PRODUCT: {
      return {
        ...state,
        showLoader: true,
        product: null
      }
    }
    
    case types.RECIEVE_PRODUCT: {
      const {product}  = action;
      return {
        ...state,
        showLoader: false,
        product: product
      }
    }
    default: return state;
  }
}

export default editProductReducer;