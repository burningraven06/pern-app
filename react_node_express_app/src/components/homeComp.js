import React from 'react';
import CarsComp from './carsComp';
import FruitsComp from './fruitsComp';

export default class HomeComp extends React.Component{
   constructor(){
      super()
      this.state = {
         showCars: false,
         showFruits: false,
      }
   }

   componentDidMount(){
      this.setState({ showCars: true, showFruits: true})
   }

   render(){
      return(
         <div>
            {/* {this.state.showCars && <CarsComp /> }
            { this.state.showFruits && <FruitsComp /> } */}
            <h3 className='text-center'>Home Page</h3>
         </div >
      )
   }   
}



