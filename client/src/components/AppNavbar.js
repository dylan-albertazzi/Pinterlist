import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";
import { Link } from "react-router-dom";

class AppNavbar extends Component {
  navState = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setNavState({
      isOpen: !this.navState.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : ``}</strong>
          </span>
        </NavItem>

        <Link
          className="navbar-text mr-3"
          to={user ? `/lists/${this.props.userId}` : ``}
        >
          <NavItem>Grocery Lists</NavItem>
        </Link>
        <Link className="navbar-text mr-3" to="/about">
          <NavItem>About</NavItem>
        </Link>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Pinterlist</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.navState.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.auth.user) {
    return {
      list: state.list,
      item: state.item, //item is the name of our reducer
      isAuthenticated: state.auth.isAuthenticated,
      userId: state.auth.user._id,
      auth: state.auth,
    };
  } else {
    return {
      list: state.list,
      item: state.item, //item is the name of our reducer
      isAuthenticated: state.auth.isAuthenticated,
      auth: state.auth,
    };
  }
};

export default connect(mapStateToProps, null)(AppNavbar);
