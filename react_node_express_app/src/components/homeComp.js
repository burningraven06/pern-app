import React from 'react';
import CarsComp from './carsComp';
import FruitsComp from './fruitsComp';
import CarCreateComp from './carCreateFormComp';
import axios from 'axios';

export class HomeComp extends React.Component{

   constructor() {
      super();
      this.state = {
         myCars: [], myFruits: [],  showCars: false,  showFruits: false,   carTitle: "Cars",
         fruitTitle: "Fruits",   showCarForm: false
      }
      this.receiveCarFormData = this.receiveCarFormData.bind(this)
   }

   componentDidMount() {
      this.callApiGetAllCars().then(res => this.setState({ myCars: res.backCars, showCars: true })).catch(err => console.log(err));
      this.callApiGetAllFruits().then(res => this.setState({ myFruits: res.backFruits, showFruits: true })).catch(err => console.log(err));
   }

   callApiGetAllCars = async () => {
      const response = await fetch('/api/cars');
      const resBody = await response.json();
      if (response.status !== 200) throw Error(resBody.message);
      return resBody;
   };

   callApiGetAllFruits = async () => {
      const response = await fetch('/api/fruits');
      const resBody = await response.json();
      if (response.status !== 200) throw Error(resBody.message);
      return resBody;
   }

   renderCreateCarComp = () => {
      this.setState({
         showCars: false, carTitle: "Create New Car", fruitTitle: "", showFruits: false, showCarForm: true
      })
   }

   receiveCarFormData = (newCN, newCC, newCP) =>{
      // this.setState({
         
      // });
      // console.log("Data Home: ", newCN, newCC, newCP)
      
      this.createNewCarApiCall(newCN, newCC, newCP);
      this.callApiGetAllCars().then((res) => { this.setState({ myCars: res.backCars, showCars: true, carTitle: "Cars", fruitTitle: "Fruits", showFruits: true, showCarForm: false, })}).catch( err => console.log(err))
   } 

   createNewCarApiCall = (name, color, price) => {
      axios.post('/api/cars', {
         name: name,
         color: color,
         price: parseInt(price)
      }).then( (res) => console.log(res)).catch( err => console.log(err))
   }

   render(){
      return (
         <div className='container'>
      
            <h3> {this.state.carTitle} </h3>
            <button className='btn btn-default' onClick={this.renderCreateCarComp}> Create</button>

            {this.state.showCarForm && <CarCreateComp unRenderComp={this.receiveCarFormData} />}

            {this.state.showCars && <CarsComp theCars={this.state.myCars} />}

            <h3> { this.state.fruitTitle }</h3>

            {this.state.showFruits && <FruitsComp theFruits={this.state.myFruits} />}

         </div>
      );
   }
}