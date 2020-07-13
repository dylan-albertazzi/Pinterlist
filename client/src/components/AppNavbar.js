import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
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
    if (this.props.auth.user) {
      console.log("==this.props.auth.user.name", this.props.auth.user.name);
    }

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text-color mr-3 text-muted">
            {this.props.auth.user ? `Welcome ${this.props.auth.user.name}` : ``}
          </span>
        </NavItem>
        <Link
          className="navbar-text-color mr-3"
          to={this.props.auth.user ? `/lists/${this.props.auth.user.id}` : ``}
        >
          <NavItem>Grocery Lists</NavItem>
        </Link>
        {/* <Link className="navbar-text-color mr-3" to="/about">
          <NavItem>About</NavItem>
        </Link> */}
        <Logout />
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        {/* <Link className="navbar-text-color mr-3" to="/about">
          <NavItem>About</NavItem>
        </Link> */}

        <RegisterModal />

        <LoginModal />
      </Fragment>
    );

    return (
      <div>
        <Navbar
          light
          collapseOnSelect
          expand="sm"
          className="mb-5 pt-3 color-nav shadow-sm"
        >
          <Container>
            <NavbarBrand>
              <Link to="/">
                <img
                  src={
                    process.env.PUBLIC_URL + "/images/Pinterlist-logo-main.png"
                  }
                  height="60"
                />
              </Link>
            </NavbarBrand>
            <NavbarToggler
              className="toggle-color border-0 p-1"
              onClick={this.toggle}
            />
            <Collapse variant="dark" dark isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto d-flex align-items-center" navbar>
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
  console.log("==My state:", state);
  if (state.auth.user) {
    return {
      list: state.list,
      item: state.item, //item is the name of our reducer
      isAuthenticated: state.auth.isAuthenticated,
      userId: state.auth.user._id,
      auth: state.auth,
      userName: state.auth.user.name,
    };
  } else {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      auth: state.auth,
    };
  }
};

export default connect(mapStateToProps, null)(AppNavbar);
