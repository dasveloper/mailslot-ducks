
import types from './types';

const INITIAL_STATE = {
  showLoader: false
}
const loginReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case types.REQUEST_LOGIN: {
      return {
        ...state,
        showLoader: true
      }
    }
    
    case types.RECIEVE_LOGIN: {
      return {
        ...state,
        showLoader: false
      }
    }
    default: return state;
  }
}

export default loginReducer;