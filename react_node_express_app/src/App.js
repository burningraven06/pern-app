import React, { Component } from 'react';

class App extends Component {
  state = {
    myMsg: ""
  }
  componentDidMount(){
    this.callApi().then(res => this.setState({ myMsg: res.backMsg})).catch(err => console.log(err));
  }

  callApi = async() =>{
    const response = await fetch('/api/hello');
    const body = await response.json();
    
    if (response.status !=200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <h1> React App </h1>
        <h4> {this.state.myMsg} </h4>
      </div>
    );
  }
}

export default App;
