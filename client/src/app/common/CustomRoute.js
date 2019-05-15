import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import Loader from "../common/Loader";
import Nav from "./Nav";

export const CustomRoute = ({
  component: Component,
  app,
  exact,
  strict,
  path,
  isPrivate = false,
  showNav = true,
  ...rest
}) => (
  <Route
    exact={exact}
    strict={strict}
    path={path}
    {...rest}
    render={props => {
      if (isPrivate && app.account === null) return <Loader />;
      else if (isPrivate && app.account == false)
        return <Redirect to="/login" />;
      else if (!showNav)
        return (
          <div className="container-wrapper">
            <Component {...props} />;
          </div>
        );
      else
        return (
          <Fragment>
            <Nav />
            <div className="container-wrapper">
              <Component {...props} />
            </div>
          </Fragment>
        );
    }}
  />
);

const mapStateToProps = ({ app }) => ({
  app
});
export default withRouter(connect(mapStateToProps)(CustomRoute));
