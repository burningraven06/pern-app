import React from 'react';
import './form-error.css';
import axios from 'axios';

export default class FruitProfileComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      theSingleFruit: {},
      isEditing: false,
      editedFruitName: "",
      editedFruitWeight: "",
      editedFruitFSize: "",
      nameInValid: false,
      weightInValid: false,
      fSzieInValid: false,
    }
    this.editModeOn = this.editModeOn.bind(this)
    this.editModeOff = this.editModeOff.bind(this)
    this.handleFruitNameChange = this.handleFruitNameChange.bind(this)
    this.handleFruitWeightChange = this.handleFruitWeightChange.bind(this)
    this.handleFruitFSizeChange = this.handleFruitFSizeChange.bind(this)
    this.validateFormData = this.validateFormData.bind(this)
    this.updateFruit = this.updateFruit.bind(this)
  }

  componentDidMount(){
    this.callApiGetSingleFruit().then( res => { 
      this.setState({ theSingleFruit: res.singleFruit })
    }).catch(err => console.log(err))
  } 

  componentDidUpdate(){
    this.callApiGetSingleFruit().then( res => {
      this.setState({ theSingleFruit: res.singleFruit })
    }).catch(err => console.log(err))
  } 

  callApiGetSingleFruit = async() =>{
    const fetchURL = '/api/fruits/' + this.props.match.params.id
    const response = await fetch(fetchURL);
    const resBody = await response.json();
    if (response.status !== 200) throw Error(resBody.message);
    return resBody;
  }

  editModeOn = () => {
    this.setState({ isEditing: true, editedFruitName: this.state.theSingleFruit.name, editedFruitWeight: this.state.theSingleFruit.weight, editedFruitFSize: this.state.theSingleFruit.fsize })
  }

  editModeOff = () => {
    this.setState({ isEditing: false})
  }

  handleFruitNameChange = (event) => {
    this.setState({ editedFruitName: event.target.value})
  }
  handleFruitWeightChange = (event) => {
    this.setState({ editedFruitWeight: event.target.value})
  }
  handleFruitFSizeChange = (event) => {
    this.setState({ editedFruitFSize: event.target.value})
  }

  validateFormData = () => {
    if (this.state.editedFruitName.length > 0 && this.state.editedFruitWeight.length > 0 &&  this.state.editedFruitFSize ){
			return true;
    }
    if (!this.state.editedFruitName.length > 0) {
      this.setState({ nameInValid: true })
      document.getElementById('fruitNameInput').className += ' orange-boundary';
      return false;
    }
    if (!this.state.editedFruitWeight.length > 0) {
      this.setState({ weightInValid: true });
      document.getElementById('fruitWeightInput').className += ' orange-boundary';
      return false;
    }
    if (!this.state.editedFruitFSize) {
      this.setState({ fSizeInValid: true });
      document.getElementById('fruitFSizeInput').className += ' orange-boundary';
      return false;
    }
  }

  resetValidationCSS = () => {
    this.setState({ nameInValid: false, weightInValid: false, fSizeInValid: false })
    document.getElementById('fruitNameInput').className -= ' orange-boundary';
    document.getElementById('fruitWeightInput').className -= ' orange-boundary';
    document.getElementById('fruitFSizeInput').className -= ' orange-boundary';
  }

  updateFruitApiCall = () => {
    const patchURL = '/api/fruits/' + this.props.match.params.id
    axios.patch(patchURL, {
      name: this.state.editedFruitName,
      weight: this.state.editedFruitWeight,
      fsize: this.state.editedFruitFSize
    }).then( (res) => {
      console.log(res);
      this.callApiGetSingleFruit().then( (res) => this.setState({
        theSingleFruit: res.singleFruit
      })).catch( err => console.log(err))
    }).catch(err => console.log(err))
  }

  updateFruit = () => {
    this.resetValidationCSS()
    this.validateFormData && this.editModeOff()
    this.updateFruitApiCall()
  }

  render(){
    return(
      <div className='col-md-10 col-md-offset-1'>
        <div className='col-sm-4'>
            <h2> {this.state.theSingleFruit.name} </h2>
            <p> Weight: <i className='fa fa-paint-scale'> </i> {this.state.theSingleFruit.weight} </p>
            <p> fSize: {this.state.theSingleFruit.fsize} px </p>
            {! this.state.isEditing && 
              <div>
                  <button className='btn btn-success' onClick={this.editModeOn}> Edit </button>
                  <button className='btn btn-danger'> Delete </button>
              </div>
            }
        </div>
        <div className='col-sm-8'>
          {this.state.isEditing && 
            <div>
              <div className='col-sm-6'>
                <h3> {this.state.editedFruitName} </h3>
                <p> {this.state.editedFruitWeight} {this.state.editedFruitFSize}</p>   
              </div>
              <div className='col-sm-6'>
                <h3> Edit Car </h3>
                <form className='form'>
                    <label htmlFor='fruitName'> Name </label>
                    <input type='text' className='form-control' name='fruitName' defaultValue={this.state.editedFruitName} onChange={this.handleFruitNameChange} id='fruitNameInput' /> 
                    { this.state.nameInValid && <span className='input-err'> ** Name Invalid</span>} <br/>

                    <label htmlFor='fruitWeight'> Weight </label>
                    <input type='text' className='form-control' name='fruitWeight' onChange={this.handleFruitWeightChange} defaultValue={this.state.editedFruitWeight} id='fruitWeightInput' /> 
                    {this.state.weightInValid && <span className='input-err'> ** Weight Invalid</span>} <br />

                    <label htmlFor='fruitFSize'> FSize </label>
                    <input type='text' className='form-control' name='fruitFSzie' onChange={this.handleFruitFSizeChange} defaultValue={this.state.editedFruitFSize} id='fruitFSizeInput' />
                    {this.state.fSzieInValid && <span className='input-err'> ** FSize Invalid</span>} <br />

                    <button className='btn btn-primary' onClick={this.updateFruit}>Save</button>
                    <button className='btn btn-default' onClick={this.editModeOff}>Cancel </button>
                </form>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}