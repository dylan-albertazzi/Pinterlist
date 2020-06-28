import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import ItemModal from "./ItemModal";
import AddPinModal from "./AddPinModal";
import { Link } from "react-router-dom";

class SingleList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    userId: PropTypes.string,
  };

  componentDidUpdate(prevProps) {
    console.log("==items length:", this.props.item.items.length);
    if (this.props.item.items.length !== prevProps.item.items.length) {
      this.props.getItems(this.props.userId, this.props.match.params.listid);
    }
  }

  componentDidMount() {
    this.props.getItems(this.props.userId, this.props.match.params.listid);
  }

  onDeleteClick = (id) => {
    console.log("== in onDeleteClick:", id);
    console.log("==userid: ", this.props.userId);
    this.props.deleteItem(
      this.props.userId,
      this.props.match.params.listid,
      id
    );
  };

  render() {
    console.log("== in single list render props:", this.props);
    const { items } = this.props.item;
    console.log("Items: ", items);
    // const rev_items = this.props.item.items;
    // if (rev_items) {
    //   var items = rev_items.reverse();
    //   console.log("==reversed items:", items);
    // } else {
    //   var items = rev_items;
    //   console.log("==Not reversed items:", items);
    // }

    // console.log("== typeof");
    // console.log(typeof this.props.userId);
    // console.log("==After typeof");
    return (
      <>
        <Row className="single-list-header mr-4 h-100">
          <Col className="my-auto">
            <h1 className="text-center">{this.props.item.listName}</h1>
          </Col>
        </Row>

        <br />
        <Container>
          <Row className="h-100">
            <Col md={6} className="text-center">
              <AddPinModal
                userid={this.props.userId}
                listid={this.props.match.params.listid}
              />
            </Col>
            <Col md={6} className="text-center">
              <ItemModal
                userid={this.props.userId}
                listid={this.props.match.params.listid}
              />
            </Col>
          </Row>

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
        </Container>
        <Container>
          <Row>
            <Col className="text-center">
              <img
                className="img-fluid bottom-img"
                src={process.env.PUBLIC_URL + "/images/people-illustration.png"}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
//only send the userID if authenticated
const mapStateToProps = (state) => {
  console.log("== state.auth.user: ", state.auth.user);
  if (state.auth.user) {
    return {
      list: state.list,
      item: state.item, //item is the name of our reducer

      isAuthenticated: state.auth.isAuthenticated,
      userId: state.auth.user._id,
    };
  } else {
    return {
      list: state.list,
      item: state.item, //item is the name of our reducer
      isAuthenticated: state.auth.isAuthenticated,
    };
  }
};
export default connect(mapStateToProps, {
  getItems,
  deleteItem,
})(SingleList); //allows us to take itemstate into a compenent property
