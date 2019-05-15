import types from "./types";

const INITIAL_STATE = {
  account: null
};
const registerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_REGISTER: {
      return {
        ...state,
        account: null
      };
    }
    case types.RECIEVE_REGISTER: {
      const { account } = action;
      return {
        ...state,
        account
      };
    }

    case types.RECIEVE_UPDATE_PROFILE: {
      const { account } = action;
      return {
        ...state,
        account
      };
    }
    case types.REQUEST_LOGIN: {
      return {
        ...state,
        account: null
      };
    }
    case types.RECIEVE_LOGIN: {
      const { account } = action;
      return {
        ...state,
        account
      };
    }
    case types.REQUEST_FETCH_USER: {
      const { account } = action;
      return {
        ...state,
        account: null
      };
    }
    case types.RECIEVE_FETCH_USER: {
      const { account } = action;
      return {
        ...state,
        account
      };
    }
    default:
      return state;
  }
};

export default registerReducer;
