import React, { Component } from 'react';

class App extends Component {
  state = {
    myMsg: "",
    myCars: []
  }
  componentDidMount(){
    this.callApiDefault().then(res => this.setState({ myMsg: res.backMsg})).catch(err => console.log(err));

    this.callApiCars().then(res => this.setState({ myCars: res.backCars})).catch(err => console.log(err));
  }

  callApiDefault = async() =>{
    const response = await fetch('/api/hello');
    const body = await response.json();
    
    if (response.status !==200) throw Error(body.message);
    // console.log("Api Call Successfull, Data: ", body);

    return body;
  };

  callApiCars = async() =>{
    const response = await fetch('/api/cars');
    const resBody = await response.json();
    if (response.status !== 200) throw Error(resBody.message);
    return resBody;
  }

  render() {
    return (
      <div className="App">
        <h1> React App </h1>
        <h4> {this.state.myMsg} </h4>
  
          <ul>
            {
              this.state.myCars.map((car) => (
                <li key={car.id}>
                  <strong style={{color:car.color}}>{car.name} </strong> {car.color} {car.price}
                </li>
              )) 
            }
          </ul>
    
         
      </div>
    );
  }
}

export default App;
