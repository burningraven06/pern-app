import React from 'react';
import {NavLink} from 'react-router-dom';

class CarsComp extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         allCars: this.props.theCars
      }
   }

   render(){
      return (
         <div>
            <div className='col-md-12' style={{paddingLeft: 0, marginBottom: 30}}>
            {
               this.state.allCars.map((car) => (
                  <div className='col-md-3 col-sm-3' key={car.id} style={{padding: 0}}>
                     <h4> 
                           <NavLink to={"/cars/" + car.id} style={{ color: car.color }}> {car.name} </NavLink>
                     </h4>
                     <p>
                        <i className='fa fa-dollar-sign'> </i> {car.price}
                     </p>
                  </div>
               ))            
            } 
            </div>
            <div className = 'col-md-12 hidden'>
            {
               this.props.theCars.map((car) => (
                  <div className='col-md-4 col-sm-4' key={car.id}>
                     <h4 style={{ color: car.color }}>{car.name} </h4>
                     <p>
                        <i className='fa fa-paint-brush'> </i> {car.color}
                        
                     </p>
                  </div>            
               ))
            }
            </div>
         </div>
      );
   }
}

export default CarsComp;
