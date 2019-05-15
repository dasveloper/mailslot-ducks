import types from "./types.js";

const requestLanding = values => {
  return {
    type: types.REQUEST_LANDING
  };
};
const recieveLanding = landingData => {
  return {
    type: types.RECIEVE_LANDING,
    landingData: landingData
  };
};


const requestSubscribe = email => {
  return {
    type: types.REQUEST_SUBSCRIBE
  };
};
const recieveSubscribe = subscribeData => {
  return {
    type: types.RECIEVE_SUBSCRIBE,
    subscribeData: subscribeData
  };
};

export default {
  requestLanding,
  recieveLanding,
  requestSubscribe,
  recieveSubscribe
};
