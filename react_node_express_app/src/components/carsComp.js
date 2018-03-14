import React from 'react';
import { NavLink } from 'react-router-dom';
import CarCreateComp from './carCreateFormComp';
import axios from 'axios';

class CarsComp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allCars: [],
			carTitle: "Cars",
			showTitle: false,
			showCars: false,
			showSearch: false,
			showCarForm: false,
			showCarCreateBtn: true,
			searchResults: [],
			showSearchResults: false
		}
		this.renderCarForm = this.renderCarForm.bind(this)
		this.receiveCarFormData = this.receiveCarFormData.bind(this)
		this.searchCar = this.searchCar.bind(this)
	}

	componentDidMount() {
		this.getAllCarsApiCall().then(res => this.setState({ allCars: res.backCars, showCars: true, showTitle: true, showSearch: true })).catch(err => console.log(err));
	}

	getAllCarsApiCall = async () => {
		const response = await fetch('/api/cars');
		const resBody = await response.json();
		if (response.status !== 200) throw Error(resBody.message);
		return resBody;
	}

	renderCarForm = () => {
		this.setState({
			showCars: false, carTitle: "Create New Car", showCarForm: true, showCarCreateBtn: false, showTitle: true, showSearch: false
		})
	}

	receiveCarFormData = (newCN, newCC, newCP) => {
		this.createNewCarApiCall(newCN, newCC, newCP);
		this.unrenderCarForm()
	} 

	unrenderCarForm = () => {
		this.setState({ showCars: true, carTitle: "Cars", showCarForm: false, showCarCreateBtn: true, showTitle: true, showSearch: true})
	}

	createNewCarApiCall = (name, color, price) => {
		axios.post('/api/cars', {
			name: name,
			color: color,
			price: parseInt(price, 10)
		}).then((res) => {
			console.log(res);
			this.getAllCarsApiCall().then((res) => { this.setState({ allCars: res.backCars }) }).catch(err => console.log(err));
		}).catch(err => console.log(err))
	}

	showResults = (searchQuery) => {
		this.setState({ showSearchResults: true, showCars: false, showCarCreateBtn: false, showTitle: false })
	}

	showNoResults = () => {
		this.setState({ showSearchResults: false, showCars: true, showCarCreateBtn: true, showTitle: true })
	}

	searchCar = (event) =>{
		event.target.value? this.showResults(event.target.value) : this.showNoResults()
	}

	render() {
		return (
			<div className='col-md-10 col-md-offset-1'>
				{this.state.showSearch && <div className='col-sm-12 pad-zero mb24'>
					<div className='col-sm-4 pad-zero'>
					<h3> Search</h3>
						<form className='form'> 
							<input type='text' className='form-control' onChange={this.searchCar} placeholder='Search' />
						</form>
						{this.state.showSearchResults && <p> Search Results</p>}
					</div>
				</div>}

				{this.state.showTitle && <h3 className={this.state.showCarForm? 'text-center': ''}> {this.state.carTitle} </h3> }
				
				{this.state.showCarCreateBtn && <button className='btn btn-default' onClick={this.renderCarForm}> Create</button> }

				{this.state.showCarForm && <CarCreateComp receiveCarData={this.receiveCarFormData} unrenderForm={this.unrenderCarForm} />}

				{ this.state.showCars && (
					<div className='col-md-12' style={{ paddingLeft: 0, marginBottom: 30 }}>
						{
							this.state.allCars.map((car) => (
								<div className='col-md-3 col-sm-3 col-xs-6' key={car.id} style={{ padding: 0 }}>
									<h4>
										<NavLink to={"/car/" + car.id} style={{ color: car.color }}> {car.name} </NavLink>
									</h4>
									<p>
										<i className='fa fa-dollar-sign'> </i> {car.price}
									</p>
								</div>
							))
						}
					</div>
				)}
			</div>
		);
	}
}

export default CarsComp;
