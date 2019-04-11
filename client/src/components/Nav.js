import PropTypes from "prop-types";
import React, { Fragment, Component } from "react";
import { withRouter, Link } from "react-router-dom";

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

class Nav extends Component {
  state = {};

   renderHeaderContent() {
    const { fixed } = this.state;
    const { user } = this.props;
    switch (user.account) {
      case null:
        return undefined;
      case false:
        return (
          <div>
            <Button className="login-button" compact as={Link} to="/login">
              Login
            </Button>
          </div>
        );
      default:
        return (
          <div >
            <Button
              compact
              href="/account/logout"
              as="a"
              style={{ marginLeft: "0.5em" }}
              color="red"
            >
              Logout
            </Button>
          </div>
        );
    }
  }

  render() {

    return (
      <div
       className="nav"
      >
      {this.renderHeaderContent()}
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}
export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Nav)
);
