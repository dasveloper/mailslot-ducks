import React from "react";
import { connect } from "react-redux";
import { Route, Redirect , withRouter } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  user,
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
      if (user.account === null) return <p></p>;
      console.log(user.account)
      return user.account  === false? (
        <Redirect to="/login" />

      ) : (
        <Component {...props}/>

      );
    }}
  />
);

const mapStateToProps = ({ user }) => ({
    user
});
export default withRouter(connect(mapStateToProps)(PrivateRoute));
