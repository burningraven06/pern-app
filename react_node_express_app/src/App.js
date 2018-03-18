import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import MessageComp from './components/msgComp';
import NavbarComp from './components/navComp';
import FruitsComp from './components/fruitsComp';
import HomeComp from './components/homeComp';
import CarsComp from './components/carsComp';
import CarProfileComp from './components/carProfileComp';
import FruitProfileComp from './components/fruitProfileComp';
import LoginComp from './components/loginComp';
import SignupComp from './components/signupComp';

class App extends Component {
 
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <h1> React App </h1> */}
          <NavbarComp />
          <Route path={"/login"} component={LoginComp} />
          <Route path={"/logout"} component={LoginComp} />
          <Route path={"/signup"} component={SignupComp} />
          <Route exact path={"/"} component={HomeComp} />
          <Route path={"/cars/"} component={CarsComp} />
          <Route path={"/fruits"} component={FruitsComp} />
          <Route path={"/about"} component={MessageComp} />
          <Route path={"/car/:id/"} component={CarProfileComp} />
          <Route path={"/fruit/:id"} component={FruitProfileComp} />
          {/* <Route path={"/about"} render={ () => <MessageComp theMsg="ola" />} /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
