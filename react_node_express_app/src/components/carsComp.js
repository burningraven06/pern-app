import React from 'react';
import { NavLink } from 'react-router-dom';
import CarCreateComp from './carCreateFormComp';
import CarProfileComp from './carProfileComp';
import axios from 'axios';

class CarsComp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allCars: [],
			carTitle: "Cars",
			showCars: false,
			showCarForm: false,
			showCarCreateBtn: true,
		}
		this.renderCreateCarComp = this.renderCreateCarComp.bind(this)
		this.receiveCarFormData = this.receiveCarFormData.bind(this)
		this.unrenderCarForm = this.unrenderCarForm.bind(this)
	}

	componentDidMount() {
		this.callApiGetAllCars().then(res => this.setState({ allCars: res.backCars, showCars: true })).catch(err => console.log(err));
	}

	callApiGetAllCars = async () => {
		const response = await fetch('/api/cars');
		const resBody = await response.json();
		if (response.status !== 200) throw Error(resBody.message);
		return resBody;
	}

	renderCreateCarComp = () => {
		this.setState({
			showCars: false, carTitle: "Create New Car", showCarForm: true,
			showCarCreateBtn: false
		})
	}

	receiveCarFormData = (newCN, newCC, newCP) => {
		this.createNewCarApiCall(newCN, newCC, newCP);
		this.unrenderCarForm()
	}

	unrenderCarForm = () => {
		this.setState({ showCars: true, carTitle: "Cars", showCarForm: false, showCarCreateBtn: true, })
	}

	createNewCarApiCall = (name, color, price) => {
		axios.post('/api/cars', {
			name: name,
			color: color,
			price: parseInt(price, 10)
		}).then((res) => {
			console.log(res);
			this.callApiGetAllCars().then((res) => { this.setState({ allCars: res.backCars }) }).catch(err => console.log(err));
		}).catch(err => console.log(err))
	}

	render() {
		return (
			<div className='col-md-10 col-md-offset-1'>
				<h3 className={this.state.showCarForm? 'text-center': ''}> {this.state.carTitle} </h3>
				
				{this.state.showCarCreateBtn && <button className='btn btn-default' onClick={this.renderCreateCarComp}> Create</button> }

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
