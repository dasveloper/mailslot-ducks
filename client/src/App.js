import React, { Component } from "react";
import { connect } from "react-redux";
import "./assets/App.scss";
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import {Router, Route, Link, Switch } from "react-router-dom";

import {fetchUser} from "./actions/account";


import CreateProfile from "./pages/CreateProfile";
import AddProduct from "./pages/AddProduct";

import { createBrowserHistory } from "history";

export const history = createBrowserHistory();



class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <Router history={history}>
        <div className="container">
         {false && <div className="nav-wrapper">
            <Nav />
          </div>}
          <div className="container-wrapper" >
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/createProfile" component={CreateProfile} />
              <PrivateRoute path="/addProduct" component={AddProduct} />

              <PrivateRoute path="/dashboard" exact component={Dashboard} />

              <Route path="/forgotPassword" component={ForgotPassword} />

        
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
const mapDispatchToProps = {
  fetchUser
};

export default connect(
  null,
  mapDispatchToProps
)(App);
