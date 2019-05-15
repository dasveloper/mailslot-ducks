import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Label, List } from "semantic-ui-react";
import {
  FiPlus,
  FiChevronDown,
  FiBox,
  FiMail,
  FiPieChart,
  FiAtSign,
  FiUser,
  FiDownload
} from "react-icons/fi";
import Moment from "react-moment";
import EmailList from "../common/EmailList";
import Loader from "../common/Loader";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import Dropdown, {
  DropdownTrigger,
  DropdownContent
} from "react-simple-dropdown";
import { CSVLink } from "react-csv";

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      accountMenuOpen: false
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside(event) {
    //if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
    alert("You clicked outside of me!");
    //}
  }

  componentDidMount() {
    this.props.fetchDashboard();
  }
  handleTabChange = tab => {
    this.setState({
      activeTab: tab,
      showAccountMenu: false
    });
  };
  toggleAccountMenu = () => {
    this.setState(prevState => ({
      accountMenuOpen: !prevState.accountMenuOpen
    }));
  };
  renderDashBoardMessage = activeTab => {
    const { account } = this.props;
    const { companyName, brandColor, logo } = account;
    if (!companyName || !brandColor || !logo) {
      return (
        <div className="dashboard-message-wrapper danger">
          <p className="dashboard-message">
            Complete your profile before adding a product.&nbsp;
            <Link className="message-link" to={"/updateProfile"}>
              Update profile
            </Link>
          </p>
        </div>
      );
    }
  };
  renderDashBoardHeader = activeTab => {
    const header = null;
    switch (activeTab) {
      case 0:
        return <h1 className="dashboard-header">Products Dashboard</h1>;
      case 1:
        return <h1 className="dashboard-header">Subscriptions Dashboard</h1>;
      case 2:
        return <h1 className="dashboard-header">Analytics Dashboard</h1>;
      case 3:
        return <h1 className="dashboard-header">Contact Us</h1>;
    }
  };
  renderDashBoard() {
    const {
      products,
      subscribers,
      company,
      account,
      logout,
      deleteProduct
    } = this.props;
    const { activeTab, accountMenuOpen } = this.state;
    if (company === null) {
      return <Loader />;
    } else if (company === "false") {
      return "Something went wrong";
    } else {
      return (
        <div className="dashboard-wrapper">
          <div className="side-nav">
            <div className="product-link-wrapper">
              <button
                onClick={() => this.handleTabChange(0)}
                className={`btn btn-link product-link ${
                  activeTab === 0 ? "active" : ""
                }`}
              >
                <FiBox className="icon product-link-icon" />
                Products
              </button>
            </div>
            <div className="product-link-wrapper">
              <button
                onClick={() => this.handleTabChange(1)}
                className={`btn btn-link product-link  ${
                  activeTab === 1 ? "active" : ""
                }`}
              >
                <FiMail className="icon product-link-icon" />
                Subscribers
              </button>
            </div>
            <div className="product-link-wrapper">
              <button
                onClick={() => this.handleTabChange(2)}
                className={`btn btn-link product-link  ${
                  activeTab === 2 ? "active" : ""
                }`}
              >
                <FiPieChart className="icon product-link-icon" />
                Analytics
              </button>
            </div>
            <div className="product-link-wrapper">
              <button
                onClick={() => this.handleTabChange(3)}
                className={`btn btn-link product-link  ${
                  activeTab === 3 ? "active" : ""
                }`}
              >
                <FiAtSign className="icon product-link-icon" />
                Support
              </button>
            </div>
          </div>

          <div className="dashboard-inner-wrapper">
            {this.renderDashBoardMessage()}
            <div className="dashboard-header-wrapper">
              {this.renderDashBoardHeader(activeTab)}
            </div>
            <div
              className={`dashboard-card  ${activeTab === 0 ? "active" : ""}`}
            >
              <div className="card-header-buttons">
                <Link
                  to={"/addProduct"}
                  className="btn btn-primary btn-icon-right add-product-button"
                >
                  Add Product <FiPlus className="icon" />
                </Link>
              </div>
              <ReactTable
                data={products}
                resizable={false}
                columns={[
                  {
                    Header: row => <p className="row-header">Image</p>,
                    accessor: "cover",
                    sortable: false,

                    Cell: row => (
                      <div
                        className="image-wrapper"
                        style={{
                          backgroundImage: `url(https://s3.amazonaws.com/mailslot/${
                            row.original.cover
                          })`
                        }}
                      />
                    )
                  },
                  {
                    Header: row => (
                      <p className="row-header">
                        Name <FiChevronDown className="sort-arrow" />
                      </p>
                    ),
                    accessor: "name"
                  },
                  {
                    Header: row => (
                      <p className="row-header">
                        Updated <FiChevronDown className="sort-arrow" />
                      </p>
                    ),
                    accessor: "updated_at",

                    Cell: row => (
                      <Moment format="MM/DD/YYYY hh:mm A">
                        {row.original.updated_at}
                      </Moment>
                    )
                  },
                  {
                    Header: "",
                    sortable: false,

                    Cell: row => (
                      <div className="dashboard-product-button-wrapper">
                        <Dropdown className="product-options-dropdown">
                          <DropdownTrigger className="btn btn-default btn-sm">
                            &#183;&#183;&#183;
                          </DropdownTrigger>
                          <DropdownContent className="align-right">
                            <ul>
                              <li>
                                <Link
                                  to={`/editProduct/${row.original.name}`}
                                  class="btn btn-link product-dropdown-option"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    deleteProduct(row.original._id)
                                  }
                                  class="btn btn-link product-dropdown-option text-danger"
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </DropdownContent>
                        </Dropdown>
                        <Link
                          className="btn btn-primary btn-sm"
                          to={`${account.companyName}/${row.original.name}`}
                        >
                          View
                        </Link>
                      </div>
                    )
                  }
                ]}
                defaultSorted={[
                  {
                    id: "updated_at",
                    desc: true
                  }
                ]}
                defaultPageSize={10}
                className="-highlight"
              />
            </div>
            <div
              className={`dashboard-card  ${activeTab === 1 ? "active" : ""}`}
            >
              <div className="card-header-buttons">
                <CSVLink
                  data={subscribers}
                  className="btn btn-primary btn-icon-right add-product-button"
                >
                  Download <FiDownload className="icon" />
                </CSVLink>
              </div>
              <EmailList emails={subscribers} />
            </div>
            <div
              className={`dashboard-card  ${activeTab === 3 ? "active" : ""}`}
            >
              
              <h2 className="support-email">accounts@justinharr.com</h2>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return this.renderDashBoard();
  }
}

export default DashboardComponent;
