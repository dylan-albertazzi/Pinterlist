import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";
//Container - a component that is hooked to redux
import { connect } from "react-redux";
import { addPinNoUser } from "../actions/itemActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class AddPinNoUser extends Component {
  state = {
    pinURL: "",
  };

  static propTypes = {};

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
      this.props.addPinNoUser(this.state.pinURL);
      //close modal
    } else {
      document.getElementById("errorMsg");
    }
  };

  render() {
    const { items } = this.props.item;
    console.log("Items: ", items);
    return (
      <div>
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

        <ListGroup>
          <TransitionGroup className="grocery-list">
            {items
              .slice(0)
              .reverse()
              .map(({ id, ingredientName }) => (
                <CSSTransition key={id} timeout={500} classNames="fade">
                  <ListGroupItem className="d-flex justify-content-between p-2">
                    <span className="align-content-center">
                      {ingredientName}
                    </span>

                    <Link
                      className="remove-btn btn-toolbar align-content-center"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, id)}
                    >
                      <i class="fa fa-trash-o"></i>
                    </Link>
                  </ListGroupItem>
                </CSSTransition>
              ))}
          </TransitionGroup>
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item, //state is the application state, item is the reducername.
});

export default connect(mapStateToProps, { addPinNoUser })(AddPinNoUser);
