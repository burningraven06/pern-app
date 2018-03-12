import React from 'react';
import {NavLink} from 'react-router-dom';

export default class FruitsComp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allFruits: [],
			showFruits: false,
			fruitTitle: "Fruits"
		}
	}

	componentDidMount() {
		this.callApiGetAllFruits().then(res => this.setState({ allFruits: res.backFruits, showFruits: true })).catch(err => console.log(err));
	}

	callApiGetAllFruits = async () => {
		const response = await fetch('/api/fruits');
		const resBody = await response.json();
		if (response.status !== 200) throw Error(resBody.message);
		return resBody;
	}
	
	render() {
		return (
			<div className='col-md-10 col-md-offset-1'>
				<h3> {this.state.fruitTitle} </h3>
				
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