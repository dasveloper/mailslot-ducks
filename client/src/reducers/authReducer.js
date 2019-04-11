import { FETCH_USER, RESET_LINK_MESSAGE } from "../actions/types";
const initialState = {
  account: null,
  resetMessage: null
};
export function fetchUser(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        account: action.payload || false
      };

    case RESET_LINK_MESSAGE:
      return {
        ...state,
        resetMessage: action.payload.message
      };
    case "CLEAR_RESET_SUCCESS":
      return {
        ...state,
        resetMessage: null
      };
    default:
      return state;
  }
}
