import React, { Component, Fragment } from "react";
import { Container, Button, Row, Col } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import RegisterButton from "./RegisterButton";
import LoginButton from "./LoginButton";
import PropTypes from "prop-types";
import ListModal from "./ListModal";
import { Link } from "react-router-dom";

class RegisterOrLogin extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    userId: PropTypes.object,
  };

  onDeleteClick = (id) => {
    console.log("== in onDeleteClick:", id);
    console.log("==userid: ", this.props.userId);
    this.props.deleteList(id, this.props.userId);
  };

  render() {
    // console.log("== typeof");
    // console.log(typeof this.props.userId);
    // console.log("==After typeof");
    return (
      <>
        <Container fluid>
          <Row className="h-100 ">
            <Col className="my-auto">
              <h4 className="text-center  m-0">
                🛒 Register or login to use Pinterlist!
              </h4>
            </Col>
          </Row>
          <br />
          <br />
        </Container>

        <Container>
          <Row className="text-center">
            <Col md={6}>
              <Button
                className="main-buttons btn-block p-0 text-center mx-auto shadow-sm rounded-pill font-weight-bold"
                // style={{ marginBottom: "2rem" }}
              >
                <RegisterButton />
              </Button>
            </Col>
            <Col md={6}>
              <Button
                className="main-buttons btn-block p-0 text-center mx-auto shadow-sm rounded-pill font-weight-bold"
                // style={{ marginBottom: "2rem" }}
              >
                <LoginButton />
              </Button>
            </Col>
          </Row>
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
export default connect(mapStateToProps, {})(RegisterOrLogin); //allows us to take itemstate into a compenent property
