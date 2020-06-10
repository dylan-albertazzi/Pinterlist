import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import GroceryLists from "./components/GroceryLists";
import SingleList from "./components/SingleList";
import ItemModal from "./components/ItemModal";
import ListModal from "./components/ListModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
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
            <Container>
              <Switch>
                <Route path="/lists/:userid" component={GroceryLists} />
                <Route
                  path="/list/:userid/:listid"
                  exact
                  component={SingleList}
                />
              </Switch>
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
