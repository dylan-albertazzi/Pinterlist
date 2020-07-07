//Use this for the RegisterOrLogin Buttons
import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavItem,
  Alert,
} from "reactstrap";

//Container - a component that is hooked to redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Link, useLocation } from "react-router-dom";

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  //toggle the register modal if the user is coming from the start here button
  componentDidMount() {
    if (this.props.location) {
      if (this.props.location.pathname === "/register") {
        this.toggle();
      }
    }
  }
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  toggle = () => {
    //Clear errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    //Create user object
    const newUser = {
      name,
      email,
      password,
    };

    //Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <>
        <Link
          className="text-light list-unstyled"
          id="register-modal"
          onClick={this.toggle}
          href="#"
        >
          <NavItem>Register</NavItem>
        </Link>
        {/* <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink> */}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Name"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                ></Input>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
