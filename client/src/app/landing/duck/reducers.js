
import types from './types';

const INITIAL_STATE = {
  showLoader: false,
  landingData: null,
  subscribeData: null,
  submitSuccess: false
}
const landingReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case types.REQUEST_LANDING: {
      return {
        ...state,
        showLoader: true
      }
    }
    
    case types.RECIEVE_LANDING: {
      const { landingData } = action;

      return {
        ...state,
        showLoader: false,
        landingData: landingData
      }
    }
    case types.REQUEST_SUBSCRIBE: {
      return {
        ...state,
        showLoader: true,
        subscribeData: null,
        submitSuccess: false

      }
    }
    case types.RECIEVE_SUBSCRIBE: {
      const { subscribeData, submitSuccess } = action;

      return {
        ...state,
        showLoader: false,
        subscribeData: subscribeData,
        submitSuccess: true
      }
    }

    default: return state;
  }
}

export default landingReducer;