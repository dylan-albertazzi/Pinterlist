import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import ItemModal from "./ItemModal";

class SingleList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    userId: PropTypes.object,
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
      <Container>
        <h1>Hello</h1>
        <ItemModal
          userid={this.props.userId}
          listid={this.props.match.params.listid}
        />

        <ListGroup>
          <TransitionGroup className="grocery-list">
            {items
              .slice(0)
              .reverse()
              .map(({ id, ingredientName }) => (
                <CSSTransition key={id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    {this.props.isAuthenticated ? (
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, id)}
                      >
                        &times;
                      </Button>
                    ) : null}

                    {ingredientName}
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
  deleteItem,
})(SingleList); //allows us to take itemstate into a compenent property
