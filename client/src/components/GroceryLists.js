import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
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

  onDeleteClick = (id) => {
    console.log("== in onDeleteClick:", id);
    console.log("==userid: ", this.props.userId);
    this.props.deleteList(id, this.props.userId);
  };

  render() {
    const { lists } = this.props.list;

    // console.log("== typeof");
    // console.log(typeof this.props.userId);
    // console.log("==After typeof");
    return (
      <Container>
        <ListModal />
        <ListGroup>
          <TransitionGroup className="grocery-list">
            {lists.map(({ _id, listName }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}

                  <Link to={`/list/${this.props.userId}/${_id}`}>
                    {" "}
                    {listName}{" "}
                  </Link>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
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
