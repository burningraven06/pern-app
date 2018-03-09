import React from 'react';
// import NavbarComp from './navComp';
// import MessageComp from './msgComp';
import CarsComp from './carsComp';
import FruitsComp from './fruitsComp';

export class HomeComp extends React.Component{

   constructor() {
      super();
      this.state = {
         myCars: [],
         myFruits: [],
         showCars: false,
         showFruits: false
      }
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

   render(){
      return (
         <div className='container'>
            <div className='row'>
               {/* <div className='col-md-10 col-md-offset-1'> <NavbarComp /> </div> */}
               {/* <div className='col-md-10 col-md-offset-1'> { this.props.children}</div> */}
            </div>
            {/* <h4> <MessageComp msgText={this.state.myMsg}/> </h4>  */}
            
            <h3> Cars</h3>
            {this.state.showCars && <CarsComp theCars={this.state.myCars} />}
            <h3> Fruits</h3>
            {this.state.showFruits && <FruitsComp theFruits={this.state.myFruits} />}


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