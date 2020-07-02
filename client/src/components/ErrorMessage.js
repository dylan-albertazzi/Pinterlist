import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
} from "reactstrap";
import { clearErrors } from "../actions/errorActions";

class ErrorMessage extends Component {
  state = {
    modal: true,
    pinURL: "",
  };
  toggle = () => {
    this.props.clearErrors();
    // this.setState({
    //   modal: !this.state.modal,
    // });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("==targ name:", e.target.name);
  };

  render() {
    return (
      <Fragment>
        {this.props.error.status == 204 && (
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Error</ModalHeader>
            <ModalBody>
              <p>{this.props.error.msg}</p>
            </ModalBody>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default connect((store) => ({ error: store.error }), { clearErrors })(
  ErrorMessage
);
