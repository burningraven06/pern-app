import React from 'react';

class CarProfileComp extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         theSingleCar: {}
      }
   }
   
   componentDidMount(){
      this.callApiGetSingleCar().then( res => this.setState({
         theSingleCar: res.singleCar
      })).catch( err => console.log(err));
   }

   componentDidUpdate(){
      this.callApiGetSingleCar().then(res => this.setState({
         theSingleCar: res.singleCar
      })).catch(err => console.log(err));
   }

   callApiGetSingleCar = async() => {
      const fetchURL = '/api/cars/' + this.props.match.params.id
      const response = await fetch(fetchURL);
      const resBody = await response.json();
      if (response.status !== 200) throw Error(resBody.message);
      return resBody;
   }
   
   render(){
      return(
         <div className='col-md-10 col-md-offset-1'> 
            <h2> {this.state.theSingleCar.name} </h2>
            <p> Color: <i className='fa fa-paint-brush'> </i> {this.state.theSingleCar.color} </p>
            <p> Price: $ {this.state.theSingleCar.price }</p>
         </div>
      );
   }
}

export default CarProfileComp;