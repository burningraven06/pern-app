import React from 'react';

class CarProfileComp extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         theSingleCar: {},
         isEditing: false,
         editedCarName: "",
         editedCarColor: "",
         editedCarPrice: ""
      }
      this.editModeOn = this.editModeOn.bind(this)
      this.editModeOff = this.editModeOff.bind(this)
      this.handleCarNameChange = this.handleCarNameChange.bind(this)
      this.handleCarColorChange = this.handleCarColorChange.bind(this)
      this.handleCarPriceChange = this.handleCarPriceChange.bind(this)
      this.updateCar = this.updateCar.bind(this)
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

   editModeOn = () => {
      this.setState({ isEditing: true})
   }

   editModeOff = () => {
      this.setState({ isEditing: false})
   }

   handleCarNameChange = (event) => {
      this.setState({ editedCarName: event.target.value})
   }

   handleCarColorChange = (event) => {
      this.setState({ editedCarColor: event.target.value})
   }
   
   handleCarPriceChange = (event) => {
      this.setState({ editedCarPrice: event.target.value})
   }

   updateCar = (event) => {
      event.preventDefault();
      console.log(this.state.editedCarName, this.state.editedCarColor, this.state.editedCarPrice)
      this.editModeOff()
   }
   render(){
      return(
         <div className='col-md-10 col-md-offset-1'> 
            <div className='col-sm-4'>
               <h2> {this.state.theSingleCar.name} </h2>
               <p> Color: <i className='fa fa-paint-brush'> </i> {this.state.theSingleCar.color} </p>
               <p> Price: $ {this.state.theSingleCar.price }</p>

               {! this.state.isEditing && 
                  <div>
                     <button className='btn btn-success' onClick={this.editModeOn}> Edit</button>
                     <button className='btn btn-danger'>Delete</button>
                  </div>
               }
            </div>
            <div className='col-sm-8'>
               { this.state.isEditing && 
                  <div>
                     <div className='col-sm-6'>
                        <h3> {this.state.editedCarName}</h3>
                        <p> {this.state.editedCarColor} {this.state.editedCarPrice}</p>
                     </div>
                     <div className='col-sm-6'>
                        <h3> Edit Car</h3>
                        <form className='form'>
                           <input type='text' className='form-control' name='carName' defaultValue={this.state.theSingleCar.name} onChange={this.handleCarNameChange} required='true' /> <br/>
                           <input type='text' className='form-control' name='carColor' defaultValue={this.state.theSingleCar.color} onChange={this.handleCarColorChange} /> <br/>
                           <input type='text' className='form-control' name='carPrice' defaultValue={this.state.theSingleCar.price} onChange={this.handleCarPriceChange} /> 
                        </form>
                        <button className='btn btn-primary' type='submit' onClick={this.updateCar}> Save</button>
                        <button className='btn btn-default' onClick ={this.editModeOff}> Close</button>
                     </div>
                  </div>
               }
            </div>
         </div>
      );
   }
}

export default CarProfileComp;