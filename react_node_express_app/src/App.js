import React, { Component } from 'react';
import MessageComp from './components/msgComp';
import NavbarComp from './components/navComp';
import { Route, BrowserRouter } from 'react-router-dom';
import {HomeComp} from './components/homeComp';
import CarProfileComp from './components/carProfileComp';
import FruitProfileComp from './components/fruitProfileComp';
class App extends Component {
 
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <h1> React App </h1> */}
          <NavbarComp />
          <Route exact path={"/"} component={HomeComp} />
          <Route path={"/about"} component={MessageComp} />
          <Route path={"/cars/:id"} component={CarProfileComp} />
          <Route path={"/fruits/:id"} component={FruitProfileComp} />
          {/* <Route path={"/about"} render={ () => <MessageComp theMsg="ola" />} /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
