import React from 'react';

export default class MessageComp extends React.Component{
   constructor(props){
      super(props);
		this.state = {
			myMsg: props.theMsg
		}
	}

	componentDidMount(){
		// this.callApiMsg().then(res => this.setState({ myMsg: res.backMsg })).catch(err => console.log(err));
	}

	callApiMsg = async () => {
		const response = await fetch('/api/hello');
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	};
	
	render(){
	
     	return (
       	<div>
				<p> Hey {this.state.myMsg}</p>
			</div>
     	);	
  	}
}
