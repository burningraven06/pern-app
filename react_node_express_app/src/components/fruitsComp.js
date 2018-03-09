import React from 'react';
import {NavLink} from 'react-router-dom';

export default class FruitsComp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allFruits: this.props.theFruits
		}
	}
	
	render() {
		return (
			<div>
				<div className='col-md-12' style={{ paddingLeft: 0, marginBottom: 30 }}>
					{
						this.state.allFruits.map((fruit) => (
							<div className='col-md-3 col-sm-3 col-xs-6' key={fruit.id} style={{padding: 0}}>
								<h4 style={{ fontSize: fruit.fSize }}>
									<NavLink to={"/fruits/" + fruit.id}> {fruit.name} </NavLink> </h4>
								<p>
									<i className='fa fa-scale'> </i> {fruit.weight}
								</p>
							</div>
						))
					}
				</div>
				<div className='col-md-12 hidden'>
					{
						this.props.theFruits.map((fruit) => (
							<div className='col-md-4 col-sm-4' key={fruit.id}>
								<h4 style={{ fontSize: fruit.fSize }}>{fruit.name} </h4>
								<p>
									<i className='fa fa-scale'> </i> {fruit.weight}
								</p>
							</div>
						))
					}
				</div>
			</div>
		)
	}
}