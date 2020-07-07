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
} from "reactstrap";

//Container - a component that is hooked to redux
import { connect } from "react-redux";
import { addPin } from "../actions/itemActions";
import PropTypes from "prop-types";

class AddPinModal extends Component {
  state = {
    modal: false,
    pinURL: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("==targ name:", e.target.name);
  };

  //Function to make sure url is from pinterest
  fromPinterest = (url) => {
    if (url.includes("www.pinterest.com")) {
      return true;
    } else {
      return false;
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log("state n props: ");
    console.log(this.state);
    console.log(this.props);

    //validate user input. Make sure it's from Pinterest.com
    if (this.fromPinterest(this.state.pinURL)) {
      //Add pin via addPin action
      this.props.addPin(
        this.props.userid,
        this.props.listid,
        this.state.pinURL
      );
      //close modal
      this.toggle();
    } else {
      document.getElementById("errorMsg").classList.toggle("invisible");
    }
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            className="main-buttons text-center p-0 pl-2 mb-2 mx-auto shadow-sm rounded-pill"
            onClick={this.toggle}
          >
            + PINTEREST RECIPE
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please log in to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add a Pinterest Recipe to Shopping List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="pinURL">Pinterest URL</Label>
                <Input
                  className="rounded-pill"
                  type="url"
                  name="pinURL"
                  id="pinURL"
                  placeholder="Add Pinterest URL here"
                  onChange={this.onChange}
                ></Input>
                <small id="errorMsg" className="alert-danger ml-1 invisible">
                  Whoops! Make sure the url is from Pinterest.
                </small>

                <Button
                  className="main-buttons text-center p-0 pl-2 mb-2 mx-auto shadow-sm rounded-pill"
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Add Pin
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // item: state.item, //state is the application state, item is the reducername.
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addPin })(AddPinModal);
