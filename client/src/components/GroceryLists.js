import React, { Component, Fragment } from "react";
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
import { getLists, deleteList } from "../actions/listActions";
import PropTypes from "prop-types";
import ListModal from "./ListModal";
import { Link } from "react-router-dom";

class GroceryLists extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    userId: PropTypes.object,
  };

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.props.getLists(this.props.userId);
    }
  }

  componentDidMount() {
    this.props.getLists(this.props.userId);
  }

  onDeleteClick = (id) => {
    console.log("== in onDeleteClick:", id);
    console.log("==userid: ", this.props.userId);
    this.props.deleteList(id, this.props.userId);
  };

  render() {
    const { lists } = this.props.list;
    const showLists = (
      <Fragment>
        <Container>
          <ListModal />
          <ListGroup>
            <TransitionGroup className="grocery-list">
              {lists.map(({ _id, listName }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem className="d-flex justify-content-between p-2">
                    <Link
                      className="align-content-center"
                      to={`/list/${this.props.userId}/${_id}`}
                    >
                      {" "}
                      {listName}{" "}
                    </Link>
                    <Link
                      className="remove-btn btn-toolbar align-content-center"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      <i class="fa fa-trash-o"></i>
                    </Link>
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
        <Container fluid>
          <br />
          <Row>
            <Col className="text-left pl-0">
              <img
                className="img-fluid bottom-img"
                src={process.env.PUBLIC_URL + "/images/lady-shopping.png"}
              />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );

    const noLists = (
      <Fragment>
        <Container fluid>
          <ListModal />
          <Row className="align-items-center mt-5">
            <Col className="text-center">
              <img
                className="img-fluid bottom-img"
                src={process.env.PUBLIC_URL + "/images/no-lists.svg"}
              />
            </Col>
            <Col>
              <span>Looks like you need to add a list!</span>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
    // console.log("== typeof");
    // console.log(typeof this.props.userId);
    // console.log("==After typeof");
    return (
      <>
        <Container fluid>
          <Row className="h-100 ">
            <Col className="my-auto">
              <h4 className="text-center  m-0">My Grocery Lists</h4>
            </Col>
          </Row>
          <br />
          <br />
        </Container>

        {lists.length > 0 ? showLists : noLists}
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
  getLists,
  deleteItem,
  deleteList,
})(GroceryLists); //allows us to take itemstate into a compenent property
