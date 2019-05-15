import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { appOperations } from "./duck";

import CustomRoute from "./common/CustomRoute";
import LoginContainer from "./login/LoginContainer";

import RegisterContainer from "./register/RegisterContainer";
import ProfileContainer from "./profile/ProfileContainer";
import LandingContainer from "./landing/LandingContainer";
import ProductContainer from "./product/ProductContainer";
import EditProductContainer from "./editProduct/EditProductContainer";

import DashboardContainer from "./dashboard/DashboardContainer";
import { relative } from "path";

export const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <Router history={history}>
        <div className="container">
            <Switch>

              <CustomRoute
                isPrivate={true}
                path="/"
                exact
                component={DashboardContainer}
              />
              <CustomRoute path="/login" component={LoginContainer} />

              <CustomRoute path="/register" component={RegisterContainer} />
              <CustomRoute
                isPrivate={true}
                path="/updateProfile"
                component={ProfileContainer}
              />
              <CustomRoute
                isPrivate={true}
                path="/addProduct"
                component={ProductContainer}
              />
              <CustomRoute
                isPrivate={true}
                path="/editProduct/:product"
                component={EditProductContainer}
              />

              <CustomRoute
                isPrivate={true}
                path="/dashboard"
                component={DashboardContainer}
              />

              <CustomRoute showNav={false} path="/:company/:product" component={LandingContainer} />
            </Switch>
        </div>
      </Router>
    );
  }
}
const mapDispatchToProps = dispatch => {
  const fetchUser = values => {
    return dispatch(appOperations.fetchUser());
  };

  return { fetchUser };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
