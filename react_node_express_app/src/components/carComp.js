import React from 'react';

class CarComp extends React.Component{
   constructor(props){
      super(props);
   }
   state = {
      dummyCars: [
         {
            id: 1,
            name: "haha"
         },
         {
            id: 2,
            name: "wow"
         }
      ]
   }
   
   render(){
      return (
         <div> 
            {
               this.state.dummyCars.map((car) => (
                  <p> {car.name} </p>
               ))
            } 
           
         </div>
      );
   }
}

export default CarComp;