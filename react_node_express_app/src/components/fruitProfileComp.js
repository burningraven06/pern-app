import React from 'react';
export default class FruitProfileComp extends React.Component{
   state = {
      theSingleFruit: {}
   }

   componentDidMount(){
      this.callApiSingleFruit().then( res => {
         this.setState({ theSingleFruit: res.singleFruit })
      }).catch(err => console.log(err))
   } 

   callApiSingleFruit = async() =>{
      const fetchURL = '/api/fruits/' + this.props.match.params.id
      const response = await fetch(fetchURL);
      const resBody = await response.json();
      if (response.status !== 200) throw Error(resBody.message);
      return resBody;
   }
   render(){
      return(
         <div className='col-md-10 col-md-offset-1'>
            <h2> {this.state.theSingleFruit.name} </h2>
            <p> Weight: <i className='fa fa-paint-scale'> </i> {this.state.theSingleFruit.weight} </p>
            <p> fSize: {this.state.theSingleFruit.fsize} px </p>
         </div>
      )
   }
}