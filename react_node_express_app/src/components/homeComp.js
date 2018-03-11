import React from 'react';
import CarsComp from './carsComp';
import FruitsComp from './fruitsComp';

export class HomeComp extends React.Component{

   constructor() {
      super();
      this.state = {
         myFruits: [],  showFruits: false, fruitTitle: "Fruits",   
      }
      
   }

   componentDidMount() {
      this.callApiGetAllFruits().then(res => this.setState({ myFruits: res.backFruits, showFruits: true })).catch(err => console.log(err));
   }

   callApiGetAllFruits = async () => {
      const response = await fetch('/api/fruits');
      const resBody = await response.json();
      if (response.status !== 200) throw Error(resBody.message);
      return resBody;
   }

   render(){
      return (
         <div>

            <CarsComp />

            <h3> { this.state.fruitTitle }</h3>

            {this.state.showFruits && <FruitsComp theFruits={this.state.myFruits} />}

         </div>
      );
   }
}