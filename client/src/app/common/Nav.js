import React from "react";
import { connect } from "react-redux";
import { FiUser } from "react-icons/fi";
import Dropdown, {
  DropdownTrigger,
  DropdownContent
} from "react-simple-dropdown";
import { Link } from "react-router-dom";
import { appOperations } from "../duck";
import logo from "../../assets/images/logo.png"
const Nav = props => (
  <div className="nav">
    <Link className="logo-link" to={"/"}><img className="logo" src={logo} /></Link>
    <Dropdown>
      <DropdownTrigger className="account">
        <FiUser className="account-icon" />
      </DropdownTrigger>
      <DropdownContent className="align-right account-dropdown">
        <ul>
          <li>
            <Link class="btn btn-link " to={"/updateProfile"}>
              Edit profile
            </Link>
          </li> 

          <li>
            <button
              class="btn  btn-danger btn-block btn-sm"
              onClick={() => props.logout()}
            >
              Log Out
            </button>
          </li>
        </ul>
      </DropdownContent>
    </Dropdown>
  </div>
);

const mapStateToProps = ({ app }) => ({
  app
});

const mapDispatchToProps = dispatch => {
  const logout = values => {
    return dispatch(appOperations.logout());
  };

  return { logout };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
