import React from 'react';
export default class FruitCreateComp extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         fruitName: "",
         fruitColor: "",
         fruitFSize: ""

      }
      this.handleFruitNameChange = this.handleFruitNameChange.bind(this);
      this.handleFruitWeightChange = this.handleFruitWeightChange.bind(this);
      this.handleFruitFSizeChange = this.handleFruitFSizeChange.bind(this);
      this.unrenderCreateForm = this.unrenderCreateForm.bind(this);
      this.sendFruitFormData = this.sendFruitFormData.bind(this);
   }

   handleFruitNameChange = (event) => {
      this.setState({
         fruitName: event.target.value
      })
   }

   handleFruitWeightChange = (event) => {
      this.setState({
         fruitColor: event.target.value
      })
   }

   handleFruitFSizeChange = (event) => {
      this.setState({ 
         fruitFSize: event.target.value
      })
   }

   sendFruitFormData = (event) => {
      event.preventDefault()
      this.props.receiveFormData( this.state.fruitName, this.state.fruitColor, this.state.fruitFSize)
   }

   unrenderCreateForm = () => {
      this.props.unrenderForm()
   }

   render(){
      return (
         <div className='col-sm-6 col-sm-offset-3'>
            <form className='form'> 
               <input type='text' placeholder='Name' className='form-control' onChange={this.handleFruitNameChange} name='fruitname' /> <br/>
               <input type='text' placeholder='Weight' className='form-control' onChange={this.handleFruitWeightChange} name='fruitcolor' /> <br/>
               <input type='text' placeholder='fSize' className='form-control' onChange={this.handleFruitFSizeChange} /> <br/>
               <button type='submit' className='btn btn-primary' onClick={this.sendFruitFormData}> Submit</button>
               <button type='cancel' className='btn btn-default' onClick={this.unrenderCreateForm}> Cancel </button>
            </form>
         </div>
      );
   }
}