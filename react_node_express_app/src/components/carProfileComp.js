import React from 'react';
import './form-error.css';
import axios from 'axios';

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
		this.callApiGetSingleCar().then( res => this.setState({
			theSingleCar: res.singleCar, 
		})).catch( err => console.log(err));
	}

  componentDidUpdate(){
    this.callApiGetSingleCar().then( res => this.setState({
      theSingleCar: res.singleCar,
    })).catch( err => console.log(err));
  }

  callApiGetSingleCar = async() => {
    const fetchURL = '/api/cars/' + this.props.match.params.id
    const response = await fetch(fetchURL);
    const resBody = await response.json();
    if (response.status !== 200) throw Error(resBody.message);
    return resBody;
  }

  editModeOn = () => {
		this.setState({ isEditing: true, editedCarName: this.state.theSingleCar.name,
				editedCarColor: this.state.theSingleCar.color, editedCarPrice: this.state.theSingleCar.price})
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

	validateFormData = () => {
		if (this.state.editedCarName.length > 0 && this.state.editedCarColor.length > 0 &&  this.state.editedCarPrice ){
			return true;
		}
		if (!this.state.editedCarName.length > 0) {
				this.setState({ nameInValid: true })
			document.getElementById('carNameInput').className += ' orange-boundary';
			return false;
		}
		if (!this.state.editedCarColor.length > 0) {
				this.setState({ colorInValid: true });
			document.getElementById('carColorInput').className += ' orange-boundary';
			return false;
		}
		if (!this.state.editedCarPrice) {
				this.setState({ priceInValid: true });
			document.getElementById('carPriceInput').className += ' orange-boundary';
			return false;
		}
	}
   
  resetValidationCSS = () => {
		this.setState({ nameInValid: false, colorInValid: false, priceInValid: false})
		document.getElementById('carPriceInput').className -= ' orange-boundary';
		document.getElementById('carColorInput').className -= ' orange-boundary';
		document.getElementById('carPriceInput').className -= ' orange-boundary';
  }

	updateCarApiCall = () => {
		const patchURL = '/api/cars/' + this.props.match.params.id
		axios.patch(patchURL, {
			name: this.state.editedCarName,
			color: this.state.editedCarColor,
			price: parseInt(this.state.editedCarPrice, 10)
		}).then((res) => {
			console.log(res);
			this.callApiGetSingleCar().then( res => this.setState({
				theSingleCar: res.singleCar,
			})).catch( err => console.log(err))
		}).catch(err => console.log(err))
	}

  updateCar = () => {
    this.resetValidationCSS()
    this.validateFormData() && this.editModeOff()
    this.updateCarApiCall()
	}

	deleteCarApiCall = () => {
		const deleteURL = '/api/cars/' + this.props.match.params.id
		axios.delete(deleteURL).then( (res) => {
			console.log(res);
		}).catch(err => console.log(err))
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
        <div className='col-sm-4'>
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
				<div className='col-sm-8'>
					{ this.state.isEditing && 
						<div>
							<div className='col-sm-6'>
								<h3> {this.state.editedCarName}</h3>
								<p> {this.state.editedCarColor} {this.state.editedCarPrice}</p>
							</div>
							<div className='col-sm-6'>
								<h3> Edit Car</h3>
								<form className='form' >
									<label htmlFor='carName'> Name</label>
									<input type='text' className='form-control' name='carName' defaultValue={this.state.editedCarName} onChange={this.handleCarNameChange} id='carNameInput' /> 
									{this.state.nameInValid && <span className='input-err'> ** Name Invalid</span>} <br/>

									<label htmlFor='carColor'> Color</label>
									<input type='text' className='form-control' name='carColor' defaultValue={this.state.editedCarColor} onChange={this.handleCarColorChange} id='carColorInput' /> 
									{this.state.colorInValid && <span className='input-err'> ** Color Invalid</span>} <br/>

									<label htmlFor='carPrice'> Price</label>
									<input type='text' className='form-control' name='carPrice' defaultValue={this.state.editedCarPrice} onChange={this.handleCarPriceChange} id='carPriceInput' /> 
									{this.state.priceInValid && <span className='input-err'> ** Price Invalid</span>}

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