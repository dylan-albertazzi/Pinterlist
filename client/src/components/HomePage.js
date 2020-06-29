import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col,
  Jumbotron,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import ListModal from "./ListModal";
import { Link } from "react-router-dom";

class HomePage extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    userId: PropTypes.object,
  };

  componentDidUpdate(prevProps) {
    // if (this.props.userId !== prevProps.userId) {
    //   this.props.getLists(this.props.userId);
    // }
  }

  componentDidMount() {}

  onDeleteClick = (id) => {
    console.log("== in onDeleteClick:", id);
    console.log("==userid: ", this.props.userId);
    this.props.deleteList(id, this.props.userId);
  };

  render() {
    const { lists } = this.props.list;

    return (
      <>
        <Jumbotron className="bg-transparent">
          <h5>
            Stop wasting time finding the ingredients you need from Pinterest
            recipes!
          </h5>
        </Jumbotron>
        <Row className="h-100 px-3">
          <Col className="my-auto">
            <img
              className="img-fluid bottom-img"
              src={process.env.PUBLIC_URL + "/images/sad-woman.png"}
            />
          </Col>
          <Col className="d-flex">
            <Button className="shadow-sm main-buttons start-btn btn-block mt-auto d-flex align-items-center py-3">
              Start Here
            </Button>
          </Col>
        </Row>
        <br />
        <Container>
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
export default connect(mapStateToProps, {})(HomePage); //allows us to take itemstate into a compenent property
