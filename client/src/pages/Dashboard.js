import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Label, List } from "semantic-ui-react";
import Loader from "../components/Loader";
import CompanyLink from "../components/CompanyLink";
import { FiPlus } from "react-icons/fi";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  renderDashBoard() {
    const { user } = this.props;

    if (user === null) {
      return <Loader />;
    } else if (user === "false") {
      return "Something went wrong";
    } else {
      return (
        <div className="dashboard-card">
          {user.companyName}
          <button className="add-product-button">
            <FiPlus className="add-icon" />
          </button>
        </div>
      );
    }
  }
  render() {
    return <div className="dashboard-wrapper">{this.renderDashBoard()}</div>;
  }
}

function mapStateToProps({ user, company }) {
  console.log(user);
  return {
    user,
    company
  };
}
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
