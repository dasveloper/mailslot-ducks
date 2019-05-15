
import types from './types';

const INITIAL_STATE = {
  showLoader: false
}
const registerReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case types.REQUEST_REGISTER: {
      return {
        ...state,
        showLoader: true
      }
    }
    
    case types.RECIEVE_REGISTER: {
      return {
        ...state,
        showLoader: false
      }
    }
    default: return state;
  }
}

export default registerReducer;