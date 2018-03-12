import React from 'react';
import CarsComp from './carsComp';

export default class CarCreateComp extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         carname: "",
         carcolor: "",
         carprice: ""
      }
      this.handleCarNameChange = this.handleCarNameChange.bind(this);
      this.handleCarColorChange = this.handleCarColorChange.bind(this);
      this.handleCarPriceChange = this.handleCarPriceChange.bind(this);
      this.sendCarFormData = this.sendCarFormData.bind(this);
      this.unrenderCreateForm = this.unrenderCreateForm.bind(this);
 
   }
   handleCarNameChange = (event) => {
      this.setState({ carname: event.target.value });
   }
   handleCarColorChange = (event) => {
      this.setState({ carcolor: event.target.value });
   }
   handleCarPriceChange = (event) => {
      this.setState({ carprice: event.target.value });
   }

   sendCarFormData = (event) => {
      event.preventDefault()
      // console.log(this.state.carname, this.state.carcolor, this.state.carprice);
      this.props.receiveCarData(this.state.carname, this.state.carcolor, this.state.carprice);
   }
   
   unrenderCreateForm = () => {
      this.props.unrenderForm()
   }

   render(){
      return (
         <div className='col-sm-6 col-sm-offset-3'> 
            <form className='form'> 
               <input type='text' placeholder='Name' name='carname' className='form-control' onChange={this.handleCarNameChange} /> <br/>
               <input type='text' placeholder='Color' name='carcolor' className='form-control' onChange={this.handleCarColorChange} /> <br />
               <input type='text' placeholder='Price' name='carprice' className='form-control' onChange={this.handleCarPriceChange} /> <br />
               <button type='submit' className='btn btn-primary' onClick={this.sendCarFormData}> Submit </button>
               <button type='cancel' className='btn btn-default' onClick={this.unrenderCreateForm}> Cancel </button>
            </form>
         </div>
      );
   }
}