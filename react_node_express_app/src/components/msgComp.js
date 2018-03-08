import React from 'react';

// class MessageComp extends React.Component{
//    constructor(props){
//       super(props);
// 	}
	
// 	render(){
// 		const passedVal = this.props;

//      	return (
//        	<div>
// 				<p> Hey {passedVal.msgText}</p>
// 			</div>
//      	);	
//   	}
// }

// export default MessageComp;

const MessageComp = (props) => {
	return (
		<p> Hey! {props.msgText} </p>
	)
}
export default MessageComp;