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
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  state = {
    modal: false,
    ingredientName: "",
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
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log("state n props: ");
    console.log(this.state);
    console.log(this.props);
    const newItem = {
      ingredientName: this.state.ingredientName,
      quantity: this.state.quantity,
    };

    //Add item via addItem action
    this.props.addItem(this.props.userid, this.props.listid, newItem);

    //close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            className="main-buttons p-0 pl-2 text-center mx-auto shadow-sm rounded-pill"
            onClick={this.toggle}
          >
            + ITEM
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please log in to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="ingredientName">Name</Label>
                <Input
                  className="rounded-pill"
                  type="text"
                  name="ingredientName"
                  id="ingredientName"
                  placeholder="Add item"
                  onChange={this.onChange}
                ></Input>
                <Label for="quantity">Quantity</Label>
                {/* <Input
                  className="rounded-pill"
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="Quantity"
                  onChange={this.onChange}
                ></Input> */}
                <Button
                  className="main-buttons text-center p-0 pl-2 mb-2 mx-auto shadow-sm rounded-pill"
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                >
                  Add Item
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
  item: state.item, //state is the application state, item is the reducername.
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
