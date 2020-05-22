import React from 'react';
import AppNavbar from './components/AppNavbar';
import GroceryList from './components/GroceryList';
import ItemModal from './components/ItemModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';


import { Provider } from 'react-redux';
import store from './store';

import './App.css';

function App() {
  return (
    <Provider store={ store }>
    <div className="App">
      <AppNavbar/>
      <Container>
        <ItemModal/>
        <GroceryList/>
      </Container>
    </div>
    </Provider>
  );
}

export default App;
