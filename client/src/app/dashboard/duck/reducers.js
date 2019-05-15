import types from "./types";

const INITIAL_STATE = {
  showLoader: false,
  dashboardData: null,
  products: [],
  subscribers: [],
  company: null
};
const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_DASHBOARD: {
      return {
        ...state,
        showLoader: true,
        dashboardData: null
      };
    }

    case types.RECIEVE_DASHBOARD: {
      const { dashboardData } = action;

      return {
        ...state,
        showLoader: false,
        products: dashboardData.products,
        subscribers: dashboardData.subscribers,
        company: dashboardData
      };
    }
    case types.REQUEST_DELETE_PRODUCT: {
      return {
        ...state,
        showLoader: true
      };
    }

    case types.RECIEVE_DELETE_PRODUCT: {
      const { productId } = action;
      return {
        ...state,
        showLoader: false,
        products: state.products.filter(product => product._id !== productId)
      };
    }
    default:
      return state;
  }
};

export default dashboardReducer;
