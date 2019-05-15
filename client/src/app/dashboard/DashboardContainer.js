import { connect } from "react-redux";
import { dashboardOperations } from "./duck";
import { appOperations } from "../duck";

import DashboardComponent from "./DashboardComponent";

const mapStateToProps = state => {
  const { account } = state.app;
  const { products, subscribers, company } = state.dashboard;
  return {
    account,
    products, subscribers, company
  };
};

const mapDispatchToProps = dispatch => {
  const fetchDashboard = () => {
    dispatch(dashboardOperations.fetchDashboard());
  };
  const deleteProduct = (productId) => {
    dispatch(dashboardOperations.deleteProduct(productId));
  };
  const logout = () => {
    dispatch(appOperations.logout());
  };
  return { fetchDashboard, logout,deleteProduct };
};

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

export default DashboardContainer;
