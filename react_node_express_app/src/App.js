import React, { Component } from 'react';
import MessageComp from './components/msgComp';
import CarComp from './components/carComp';
import FruitComp from './components/fruitComp';

class App extends Component {
  constructor(){
    super();
    this.state = {
      myMsg: "",
      myCars: [],
      myFruits: [],
      showCars: false,
      showFruits: false
    }
    this.toggleMyCars = this.toggleMyCars.bind(this);
    this.toggleMyFruits = this.toggleMyFruits.bind(this);
  }

  componentDidMount(){
    this.callApiDefault().then(res => this.setState({ myMsg: res.backMsg })).catch(err => console.log(err));

    this.callApiCars().then(res => this.setState({ myCars: res.backCars })).catch(err => console.log(err));

    this.callApiFruits().then(res => this.setState({ myFruits: res.backFruits })).catch(err => console.log(err));
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
  };

  callApiFruits = async()=>{
    const response = await fetch('/api/fruits');
    const resBody = await response.json();
    if (response.status!==200) throw Error(resBody.message);
    return resBody;
  }
  
  toggleMyCars(){
    this.setState({
      showCars: !this.state.showCars
    })
  }

  toggleMyFruits(){
    this.setState({
      showFruits: !this.state.showFruits
    })
  }

  render() {
    return (
      <div className="App">
        <h1> React App </h1>
        
        <h4> <MessageComp msgText={this.state.myMsg}/> </h4> 
        <div className='row'>
          <button className='btn btn-default' onClick={this.toggleMyCars}> Cars</button>
          <button className='btn btn-default' onClick={this.toggleMyFruits}> Fruits </button>
        </div>

        { this.state.showCars && <CarComp theCars={this.state.myCars}/> }

        { this.state.showFruits && <FruitComp theFruits={this.state.myFruits} /> }


        {/* <h4> {this.state.myMsg} </h4> */}
        {
          // this.state.myCars.map((car) => (
          //   <div className='col-md-4 col-sm-4' key={car.id}>
          //     <h4 style={{color:car.color}}>{car.name} </h4>
          //     <p> 
          //       <i className='fa fa-paint-brush'> </i> {car.color} 
          //       <i className='fa fa-dollar-sign'> </i> {car.price} 
          //     </p>
          //   </div>
          // ))
        }

        {
          // this.state.myFruits.map((fruit) => (
          //   <div className='col-md-4 col-sm-4' key={fruit.id}>
          //     <h4 style={{fontSize:fruit.fSize}}>{fruit.name} </h4>
          //     <p> 
          //       <i className='fa fa-scale'> </i> {fruit.weight}
          //     </p>
          //   </div>
          // ))
        }
         
      </div>
    );
  }
}

export default App;
