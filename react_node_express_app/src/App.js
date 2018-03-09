import React, { Component } from 'react';
import MessageComp from './components/msgComp';
import CarComp from './components/carComp';
import FruitComp from './components/fruitComp';
import NavbarComp from './components/navComp';
import { Route, BrowserRouter, NavLink } from 'react-router-dom';
import { RootComp } from './components/rootComp';


class App extends Component {
 

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <h1> React App </h1> */}
          <Route exact path={"/"} component={RootComp} />
          {/* <Route path={"/about"} component={MessageComp} /> */}
          <Route path={"/about"} render={ () => <MessageComp theMsg="ola" />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
