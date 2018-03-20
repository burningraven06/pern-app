import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import MessageComp from './components/msgComp';
import NavbarComp from './components/navComp';
import FruitsComp from './components/fruitsComp';
import HomeComp from './components/homeComp';
import CarsComp from './components/carsComp';
import CarProfileComp from './components/carProfileComp';
import FruitProfileComp from './components/fruitProfileComp';
import LoginComp from './components/loginComp';
import LogoutComp from './components/logoutComp';
import SignupComp from './components/signupComp';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      inSession: false,
      loggedUserName: "",
      carDeleted: false,
    }
    this.updateStatus = this.updateStatus.bind(this)
    this.destroyUserSession = this.destroyUserSession.bind(this)
  }

  componentDidMount() {
    this.checkInSession()
  } 

  checkInSession = () => {
    axios.get('/api').then((res) => {
      this.setState({ inSession: res.data.inSession });
    }).catch(err => console.log(err));
  }

  updateStatus = (boolStatus, username) => {
    this.setState({ inSession: boolStatus, loggedUserName: username });
  }

  destroyUserSession = (boolStatus) =>{
    this.setState({ inSession: boolStatus })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavbarComp isLoggedIn={this.state.inSession} loggedUserName={this.state.loggedUserName}/>
          <Route path={'/login/'} render={() => <LoginComp checkStatus={this.updateStatus} />} />
          <Route path={"/logout"} render={() => <LogoutComp isLoggedUser={this.state.inSession} logoutUser={this.destroyUserSession} />} />
          <Route path={"/signup"} component={SignupComp} />
          <Route exact path={"/"} component={HomeComp} />
          <Route path={'/cars/'} render={ () => <CarsComp isLoggedIn={this.state.inSession} />} />
          <Route path={"/fruits"} render={() => <FruitsComp isLoggedIn={this.state.inSession} /> }/>
          <Route path={"/car/:id/"} render={(props) => <CarProfileComp isLoggedIn={this.state.inSession} {...props} />} />
          <Route path={"/fruit/:id"} render={(props) => <FruitProfileComp isLoggedIn={this.state.inSession} {...props} />} />
          <Route path={"/about"} component={MessageComp} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
