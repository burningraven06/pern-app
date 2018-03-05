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

  callApi(){
    const response = await fetch('/api/hello');
    const body = await response.json();
    
    if (response.status !=200) throw Error(body.message);

    return body;
  };
  
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
