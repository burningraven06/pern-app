import React from 'react';

class CarComp extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         allCars: []
      }
   }

   componentWillMount(){
      this.setState({
         allCars: this.props.theCars
      })
   }

   render(){
      
      return (
         <div>
            <div className='col-md-6'>
            1. {
               this.state.allCars.map((car) => (
                  <div className='col-md-4 col-sm-4' key={car.id}>
                     <h4 style={{ color: car.color }}>{car.name} </h4>
                     <p>
                        <i className='fa fa-paint-brush'> </i> {car.color}
                        <i className='fa fa-dollar-sign'> </i> {car.price}
                     </p>
                  </div>
               ))            
            } 
            </div>
            <div className = 'col-md-6 hidden'>
            2. {
               this.props.theCars.map((car) => (
                  <div className='col-md-4 col-sm-4' key={car.id}>
                     <h4 style={{ color: car.color }}>{car.name} </h4>
                     <p>
                        <i className='fa fa-paint-brush'> </i> {car.color}
                        <i className='fa fa-dollar-sign'> </i> {car.price}
                     </p>
                  </div>            
               ))
            }
            </div>
         </div>
      );
   }
}

export default CarComp;
