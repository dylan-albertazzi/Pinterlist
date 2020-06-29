import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import GroceryLists from "./components/GroceryLists";
import SingleList from "./components/SingleList";
import HomePage from "./components/HomePage";
import ItemModal from "./components/ItemModal";
import ListModal from "./components/ListModal";
import AppFooter from "./components/AppFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
        <Router>
          <div className="App">
            <AppNavbar />

            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/lists/:userid" exact component={GroceryLists} />
              <Route
                path="/list/:userid/:listid"
                exact
                component={SingleList}
              />
            </Switch>
            <AppFooter />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
