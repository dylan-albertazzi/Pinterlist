import React, { Component, Fragment, useState } from "react";
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
import "../App.css";
class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text-color mr-3">
            <strong>{user ? `Welcome ${user.name}` : ``}</strong>
          </span>
        </NavItem>

        <Link
          className="navbar-text-color mr-3"
          to={user ? `/lists/${this.props.userId}` : ``}
        >
          <NavItem>Grocery Lists</NavItem>
        </Link>
        <Link className="navbar-text-color mr-3" to="/about">
          <NavItem>About</NavItem>
        </Link>

        <Logout />
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
        <Navbar
          light
          collapseOnSelect
          expand="sm"
          className="mb-5 pt-3 color-nav"
        >
          <Container>
            <NavbarBrand href="#">
              <img
                src={
                  process.env.PUBLIC_URL + "/images/Pinterlist-logo-main.png"
                }
                height="70"
              />
            </NavbarBrand>
            <NavbarToggler className="toggle-color" onClick={this.toggle} />
            <Collapse variant="dark" dark isOpen={this.state.isOpen} navbar>
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
