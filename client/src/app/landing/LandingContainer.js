import { connect } from "react-redux";
import { landingOperations } from "./duck";
import LandingComponent from "./LandingComponent";

const mapStateToProps = state => {
  const { landingData,showLoader, submitSuccess } = state.landing;

  return { landingData,showLoader,submitSuccess };
};

const mapDispatchToProps = dispatch => {
  const fetchLanding = (company, product) => {
    dispatch(landingOperations.fetchLanding(company, product));
  };
  const subscribe = values => {
    return dispatch(landingOperations.subscribe(values));
  };

  return { fetchLanding, subscribe };
};

const LandingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingComponent);

export default LandingContainer;
