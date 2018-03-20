import React from 'react';
import './form-error.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class CarProfileComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
			theSingleCar: {},
			isEditing: false,
			editedCarName: "",
			editedCarColor: "",
			editedCarPrice: "",
			nameInValid: false,
			colorInValid: false,
			priceInValid: false,
			carUpdated: false,
			carDeleted: false,
			isLoggedIn: this.props.isLoggedIn,
			loginMsg: ""
		}
		this.editModeOn = this.editModeOn.bind(this)
		this.editModeOff = this.editModeOff.bind(this)
		this.handleCarNameChange = this.handleCarNameChange.bind(this)
		this.handleCarColorChange = this.handleCarColorChange.bind(this)
		this.handleCarPriceChange = this.handleCarPriceChange.bind(this)
		this.updateCar = this.updateCar.bind(this)
		this.validateFormData = this.validateFormData.bind(this)
		this.deleteCar = this.deleteCar.bind(this)
	}
   
	componentDidMount(){
		this.callApiGetSingleCar()
	}

  callApiGetSingleCar = () => {
    const fetchURL = '/api/cars/' + this.props.match.params.id
		axios.get(fetchURL).then(res => this.setState({	theSingleCar: res.data.singleCar })).catch(err => console.log(err));
  }

  editModeOn = () => {
		this.setState({ isEditing: true, editedCarName: this.state.theSingleCar.name,
			editedCarColor: this.state.theSingleCar.color, editedCarPrice: this.state.theSingleCar.price, carUpdated: false, nameInValid: false, colorInValid: false,	priceInValid: false,})
  }

	editModeOff = () => {
		this.setState({ isEditing: false})
	}

	handleCarNameChange = (event) => {
		if (!event.target.value){
			this.setState({ nameInValid: true }); 
			document.getElementById('carNameInput').classList.add('orange-boundary');
			document.getElementById('editCarBtn').classList.add('disabled');
		} else {
			this.setState({ nameInValid: false });
			document.getElementById('carPriceInput').classList.remove('orange-boundary');
			document.getElementById('editCarBtn').classList.remove('disabled');
		}
		this.setState({ editedCarName: event.target.value})
	}

	handleCarColorChange = (event) => {
		if (!event.target.value) {
			this.setState({ colorInValid: true });
			document.getElementById('carColorInput').classList.add('orange-boundary');
			document.getElementById('editCarBtn').classList.add('disabled');
		} else {
			this.setState({ colorInValid: false });
			document.getElementById('carColorInput').classList.remove('orange-boundary');
			document.getElementById('editCarBtn').classList.remove('disabled');
		}
		this.setState({ editedCarColor: event.target.value})
	}
	
	handleCarPriceChange = (event) => {
		if (!event.target.value) {
			this.setState({ priceInValid: true });
			document.getElementById('carPriceInput').classList.add('orange-boundary');
			document.getElementById('editCarBtn').classList.add('disabled');
		} else {
			this.setState({ priceInValid: false });
			document.getElementById('carPriceInput').classList.remove('orange-boundary');
			document.getElementById('editCarBtn').classList.remove('disabled');
		}
		this.setState({ editedCarPrice: event.target.value})
	}

	validateFormData = () => {
		if (this.state.editedCarName.length > 0 && this.state.editedCarColor.length > 0 &&  this.state.editedCarPrice ){
			return true;
		}
		return false
	}

	updateCarApiCall = () => {
		if (this.state.isLoggedIn){
			const patchURL = '/api/cars/' + this.props.match.params.id
			axios.patch(patchURL, {
				name: this.state.editedCarName,
				color: this.state.editedCarColor,
				price: parseInt(this.state.editedCarPrice, 10)
			}).then((res) => {
				console.log(res);
				this.callApiGetSingleCar().then(res => this.setState({
					theSingleCar: res.singleCar,
				})).catch(err => console.log(err))
			}).catch(err => console.log(err))
		}
	}

  updateCar = () => {
		this.validateFormData() && this.editModeOff()
		this.validateFormData() && this.updateCarApiCall()
		this.setState({ carUpdated: true})
	}

	deleteCarApiCall = () => {
		if (this.state.isLoggedIn) {
			const deleteURL = '/api/cars/' + this.props.match.params.id
			axios.delete(deleteURL).then( (res) => {
				console.log(res);
			}).catch(err => console.log(err))
		}
	}

	redirectToCars = () => {
		this.props.history.push('/cars')
	}
	
	deleteCar = () => {
		this.deleteCarApiCall()
		this.redirectToCars()
	}

  render(){
    return(
      <div className='col-md-10 col-md-offset-1'> 
				{!this.state.isLoggedIn && 
					<div className='col-sm-6 col-sm-offset-3 mt32'> 
						{this.state.loginMsg} <h3> <NavLink to={'/login/'}> Login </NavLink> </h3> 
					</div>
				}

				{this.state.isLoggedIn && 
					<div className='col-sm-4'>
						{/* {this.state.carUpdated &&
							<div className='alert alert-success alert-dismissible' role="alert">
								<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<p> Car Updated</p>
							</div>
						} */}
						<h2> {this.state.theSingleCar.name} </h2>
						<p> Color: <i className='fa fa-paint-brush'> </i> {this.state.theSingleCar.color} </p>
						<p> Price: $ {this.state.theSingleCar.price }</p>

						{! this.state.isEditing && 
							<div>
									<button className='btn btn-success' onClick={this.editModeOn}> Edit</button>
									<button className='btn btn-danger' onClick={this.deleteCar} >Delete</button>
							</div>
						}
					</div>
				}

				{this.state.isLoggedIn && 
					<div className='col-sm-8'>
						{this.state.isEditing && 
							<div>
								<div className='col-sm-6'>
									<h3> {this.state.editedCarName}</h3>
									<p> {this.state.editedCarColor} {this.state.editedCarPrice}</p>
								</div>

								<div className='col-sm-6'>
									<h3> Edit Car</h3>
									<form className='form'>
										<div className='form-group'>
											<label htmlFor='carName'> Name</label>
											<input type='text' className='form-control' name='carName' defaultValue={this.state.editedCarName} onChange={this.handleCarNameChange} id='carNameInput' /> 
											{this.state.nameInValid && <span className='input-err'> ** Name Invalid</span>} <br/>
										</div>

										<div className='form-group'>
											<label htmlFor='carColor'> Color</label>
											<input type='text' className='form-control' name='carColor' defaultValue={this.state.editedCarColor} onChange={this.handleCarColorChange} id='carColorInput' /> 
											{this.state.colorInValid && <span className='input-err'> ** Color Invalid</span>} <br/>
										</div>

										<div className='form-group'>
											<label htmlFor='carPrice'> Price</label>
											<input type='number' className='form-control' name='carPrice' defaultValue={this.state.editedCarPrice} onChange={this.handleCarPriceChange} id='carPriceInput' /> 
											{this.state.priceInValid && <span className='input-err'> ** Price Invalid</span>}
										</div>
									</form>

									<button className='btn btn-primary' type='submit' onClick={this.updateCar} id='editCarBtn'> Save</button>
									<button className='btn btn-default' onClick ={this.editModeOff}> Close</button>

								</div>
							</div>
						}
					</div>
				}
      </div>
    )
	} 
}

export default CarProfileComp;