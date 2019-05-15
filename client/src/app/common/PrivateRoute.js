import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import Loader from "../common/Loader";
import Nav from "./Nav";

export const PrivateRoute = ({
  component: Component,
  app,
  exact,
  strict,
  path,
  ...rest
}) => (
  <Route
    exact={exact}
    strict={strict}
    path={path}
    {...rest}
    render={props => {
      if (app.account === null) return <Loader />;
      return app.account == false ? (
        <Redirect to="/login" />
      ) : (
        <Fragment>
          <Nav />
          <Component {...props} />
        </Fragment>
      );
    }}
  />
);

const mapStateToProps = ({ app }) => ({
  app
});
export default withRouter(connect(mapStateToProps)(PrivateRoute));
