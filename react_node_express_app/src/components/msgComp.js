import React from 'react';
import axios from 'axios';

export default class MessageComp extends React.Component{
   constructor(){
		super();
		this.state = {
			myMsg: ""
		}
	}

	componentDidMount(){
		this.callApiMsg()
	}

	callApiMsg = () => {
		axios.get('/api/hello').then(res => {
			this.setState({ myMsg: res.data.backMsg}) 
		}).catch(err => console.log(err));
	}
	
	render(){
    return (
     	<div>
				<h4 className='text-center'> Hey {this.state.myMsg} & React App works too</h4>
			</div>
     	);	
  	}
}
