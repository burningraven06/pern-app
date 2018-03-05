import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    myMsg: ""
  }
  componentDidMount(){
    this.callApi().then(res => this.setState({ myMsg: res.backMsg})).catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
