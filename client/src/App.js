import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import GroceryList from "./components/GroceryList";
import ItemModal from "./components/ItemModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <GroceryList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
