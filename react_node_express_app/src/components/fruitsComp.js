import React from 'react';
import {NavLink} from 'react-router-dom';
import FruitCreateComp from './fruitCreateComp';
import axios from 'axios';

export default class FruitsComp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allFruits: [],
			showFruits: false,
			showTitle: false,
			showSearch: false,
			fruitTitle: "Fruits",
			showFruitForm: false,
			showFruitCreateBtn: true,
			searchResults: [],
			showSearchResults: false
		}
		this.renderFruitForm = this.renderFruitForm.bind(this);
		this.receiveFruitFormData = this.receiveFruitFormData;
		this.searchFruit = this.searchFruit.bind(this);
	}

	componentDidMount() {
		this.getAllFruitsApiCall().then(res => this.setState({ allFruits: res.backFruits, showFruits: true, showTitle: true , showSearch: true })).catch(err => console.log(err));
	}  

	getAllFruitsApiCall = async () => {
		const response = await fetch('/api/fruits');
		const resBody = await response.json();
		if (response.status !== 200) throw Error(resBody.message);
		return resBody;
	}
	
	renderFruitForm = () => {
		this.setState({
			showFruits: false, showFruitForm: true, showFruitCreateBtn: false, fruitTitle: 'Create New Fruit', showSearch: false
		})
	}

	unrenderFruitForm = () => {
		this.setState({
			showFruits: true, showFruitForm: false, showFruitCreateBtn: true, fruitTitle: "Fruits", showSearch: true
		})
	}

	receiveFruitFormData = (newFN, newFW, newFS) => {
		this.createNewFruitApiCall(newFN, newFW, newFS);
		this.unrenderFruitForm()
	}

	createNewFruitApiCall = (name, weight, fsize) => {
		axios.post('/api/fruits', {
			name: name,
			weight: weight,
			fsize: parseInt(fsize, 10)
		}).then( (res) => {
			console.log(res);
			this.getAllFruitsApiCall().then(res => this.setState({ allFruits: res.backFruits, showFruits: true })).catch(err => console.log(err));

		}).catch( err => console.log(err))
	}
	
	showResults = (searchQuery) => {
		var searchRes = this.state.allFruits;
		searchRes = searchRes.filter((fruit) => {
			return fruit.name.toString().toLowerCase().search( searchQuery.toString().toLowerCase() ) !== -1;
		});
		this.setState({ showSearchResults: true, searchResults: searchRes, showFruits: false, showFruitCreateBtn: false, showTitle: false})
	}
	
	showNoResults = () => {
		this.setState({ showSearchResults: false, showFruits: true, showFruitCreateBtn:true, showTitle:true })
	}

	searchFruit = (event) => {	
		event.target.value ? this.showResults(event.target.value) : this.showNoResults()		
	}
	
	render() {
		return (
			<div className='col-md-10 col-md-offset-1'>
				{this.state.showSearch && <div className='col-sm-12 pad-zero mb24'>
					<div className='col-sm-4 pad-zero'>
						<h3> Search</h3>
						<form className='form'>
							<input type='text' onChange={this.searchFruit} placeholder='Search' className='form-control' />
						</form>
						{this.state.showSearchResults && (
							<div style={{marginTop: '24px'}}>
								<p> Search Results</p>
								{this.state.searchResults.map((fruit) => (
									<p> <NavLink to={'/fruit/' + fruit.id}> {fruit.name} </NavLink> </p>
								))}
							</div>
						)}
					</div>
					</div>	}

				{this.state.showTitle && <h3 className={this.state.showFruitForm? 'text-center': ''}> {this.state.fruitTitle} </h3> }
				
				{this.state.showFruitCreateBtn && <button className='btn btn-default' onClick={this.renderFruitForm}> Create</button>}

				{this.state.showFruitForm && <FruitCreateComp unrenderForm={this.unrenderFruitForm} receiveFormData={this.receiveFruitFormData} />}

				{this.state.showFruits && (
				<div className='col-md-12' style={{ paddingLeft: 0, marginBottom: 30 }}>
					{
						this.state.allFruits.map((fruit) => (
							<div className='col-md-3 col-sm-3 col-xs-6' key={fruit.id} style={{padding: 0}}>
								<h4 style={{ fontSize: fruit.fSize }}>
									<NavLink to={"/fruit/" + fruit.id}> {fruit.name} </NavLink> </h4>
								<p>
									<i className='fa fa-scale'> </i> {fruit.weight}
								</p>
							</div>
						))
					}
				</div>
				)}
			</div>
		)
	}
}