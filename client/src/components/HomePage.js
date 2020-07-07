import React, { Component } from "react";
import { Container, Button, Row, Col, Jumbotron } from "reactstrap";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class HomePage extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    userId: PropTypes.object,
  };

  componentDidMount() {}

  onDeleteClick = (id) => {
    console.log("== in onDeleteClick:", id);
    console.log("==userid: ", this.props.userId);
    this.props.deleteList(id, this.props.userId);
  };

  render() {
    const { user } = this.props.auth;
    return (
      <>
        <Container fluid>
          <Jumbotron className="bg-transparent text-center mb-0">
            <h4>
              Stop wasting time finding the ingredients you need from Pinterest
              recipes!
            </h4>
          </Jumbotron>
          <Row className="h-100 px-3">
            <Col md={6} className="my-auto">
              <img
                className="img-fluid bottom-img"
                src={process.env.PUBLIC_URL + "/images/checking-list.svg"}
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <Button className="shadow-sm main-buttons start-btn btn-block my-auto d-flex align-items-center py-3 justify-content-center">
                <Link
                  className="text-light"
                  to={
                    this.props.auth.user
                      ? `/lists/${this.props.auth.user.id}`
                      : `/register`
                  }
                >
                  START HERE
                </Link>
              </Button>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="mt-5 d-flex align-items-center">
            <Col className="text-left my-5 ">
              <h5>One Click</h5>

              <p>Turn a Pinterest Recipe into a Grocery List</p>
            </Col>
            <Col md={6} className="my-auto">
              <img
                className="img-fluid bottom-img"
                src={process.env.PUBLIC_URL + "/images/pin-to-list.svg"}
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="mt-5">
            <Col className="text-left my-5">
              <h5>How it works</h5>
              <p>
                Say which pins you want the ingredients for and Pinterlist
                thoughtfully reads the essay long story leading up to the recipe
                AND returns the ingredients you need to buy! All for absolutely
                no cost!
              </p>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="my-3">
            <Col className="d-flex justify-content-center pt-4">
              <Button className="shadow-sm main-buttons start-btn btn-block my-auto d-flex align-items-center py-3 justify-content-center">
                <Link
                  className="text-light"
                  to={
                    this.props.auth.user
                      ? `/lists/${this.props.auth.user.id}`
                      : `/register`
                  }
                >
                  TRY IT OUT
                </Link>
              </Button>
            </Col>
          </Row>
          <Row className="my-5">
            <Col className="text-center">
              <img
                className="img-fluid bottom-img"
                src={process.env.PUBLIC_URL + "/images/accomplished-woman.svg"}
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
      auth: state.auth,
    };
  } else {
    return {
      list: state.list,
      item: state.item, //item is the name of our reducer
      isAuthenticated: state.auth.isAuthenticated,
      auth: state.auth,
    };
  }
};
export default connect(mapStateToProps, {})(HomePage); //allows us to take itemstate into a compenent property
