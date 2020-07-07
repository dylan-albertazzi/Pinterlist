import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { NavItem } from "reactstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../App.css";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Fragment>
        <Link
          className="navbar-text-color mr-3"
          onClick={this.props.logout}
          to="/"
        >
          <NavItem>Logout</NavItem>
        </Link>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);
