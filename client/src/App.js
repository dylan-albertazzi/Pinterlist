import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import GroceryLists from "./components/GroceryLists";
import SingleList from "./components/SingleList";
import HomePage from "./components/HomePage";
import RegisterOrLogin from "./components/RegisterOrLogin";
import AppFooter from "./components/AppFooter";
import "bootstrap/dist/css/bootstrap.min.css";
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
          <div className="App d-flex flex-column min-vh-100">
            <AppNavbar />

            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/lists/:userid" exact component={GroceryLists} />
              <Route
                path="/list/:userid/:listid"
                exact
                component={SingleList}
              />
              <Route
                path="/register"
                exact
                component={RegisterOrLogin}

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
