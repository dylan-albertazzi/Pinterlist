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
  Row,
  Col,
} from "reactstrap";

//Container - a component that is hooked to redux
import { connect } from "react-redux";
import { addList } from "../actions/listActions";
import PropTypes from "prop-types";

class ListModal extends Component {
  state = {
    modal: false,
    listName: "",
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

    const newList = {
      listName: this.state.listName,
    };
    console.log("listName: ", this.state);
    //Add list via addList action
    this.props.addList(this.props.userId, newList);

    //close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Row className="h-100">
          <Col>
            {this.props.isAuthenticated ? (
              <Button
                className="main-buttons btn-block p-0 pl-2 text-center mx-auto"
                // style={{ marginBottom: "2rem" }}
                onClick={this.toggle}
              >
                Add List
              </Button>
            ) : (
              <h4 className="mb-3 ml-4">Please log in to manage lists</h4>
            )}
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Make a New Shopping List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="listName">List</Label>
                <Input
                  type="text"
                  name="listName"
                  id="list"
                  placeholder="Add shopping list"
                  onChange={this.onChange}
                ></Input>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add List
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  if (state.auth.user) {
    return {
      list: state.listName, //item is the name of our reducer
      isAuthenticated: state.auth.isAuthenticated,
      userId: state.auth.user._id,
    };
  } else {
    return {
      list: state.listName, //item is the name of our reducer
      isAuthenticated: state.auth.isAuthenticated,
    };
  }
};

export default connect(mapStateToProps, { addList })(ListModal);
