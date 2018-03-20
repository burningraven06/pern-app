import React from 'react';
import './form-error.css';

export default class FruitCreateComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitName: "",
      fruitWeight: "",
      fruitFSize: "",
      nameInValid:false,
      weightInValid: false,
      fSizeInValid: false,
    }
    this.handleFruitNameChange = this.handleFruitNameChange.bind(this);
    this.handleFruitWeightChange = this.handleFruitWeightChange.bind(this);
    this.handleFruitFSizeChange = this.handleFruitFSizeChange.bind(this);
    this.unrenderCreateForm = this.unrenderCreateForm.bind(this);
    this.sendFruitFormData = this.sendFruitFormData.bind(this);
  }

  handleFruitNameChange = (event) => {
    if (!event.target.value){
      this.setState({ nameInValid: true });
      document.getElementById('fruitNameInput').classList.add('orange-boundary');
      document.getElementById('createFruitBtn').classList.add('disabled');
    } else{
      this.setState({ nameInValid: false });
      document.getElementById('fruitNameInput').classList.remove('orange-boundary');
      document.getElementById('createFruitBtn').classList.remove('disabled');
    }
    this.setState({ fruitName: event.target.value })
  }

  handleFruitWeightChange = (event) => {
    if (!event.target.value) {
      this.setState({ weightInValid: true });
      document.getElementById('fruitWeightInput').classList.add('orange-boundary');
      document.getElementById('createFruitBtn').classList.add('disabled');
    } else {
      this.setState({ weightInValid: false });
      document.getElementById('fruitWeightInput').classList.remove('orange-boundary');
      document.getElementById('createFruitBtn').classList.remove('disabled');
    }
    this.setState({ fruitWeight: event.target.value })
  }

  handleFruitFSizeChange = (event) => {
    if (!event.target.value) {
      this.setState({ fSizeInValid: true });
      document.getElementById('fruitFSizeInput').classList.add('orange-boundary');
      document.getElementById('createFruitBtn').classList.add('disabled');
    } else {
      this.setState({ fSizeInValid: false });
      document.getElementById('fruitFSizeInput').classList.remove('orange-boundary');
      document.getElementById('createFruitBtn').classList.remove('disabled');
    }
    this.setState({ fruitFSize: event.target.value })
  }

  validateFormData = () => {
    if (this.state.fruitName.length > 0 && this.state.fruitWeight.length > 0 && this.state.fruitFSize){
      return true;
    }
    if (!this.state.fruitName.length > 0) {
      this.setState({ nameInValid: true })
      document.getElementById('fruitNameInput').classList.add('orange-boundary');
      document.getElementById('createFruitBtn').classList.add('disabled');
      return false;
    }
    if (!this.state.fruitWeight.length > 0) {
      this.setState({ weightInValid: true })
      document.getElementById('fruitWeightInput').classList.add('orange-boundary');
      document.getElementById('createFruitBtn').classList.add('disabled');
      return false;
    }
    if (!this.state.fruitFSize) {
      this.setState({ fSizeInValid: true })
      document.getElementById('fruitFSizeInput').classList.add('orange-boundary');
      document.getElementById('createFruitBtn').classList.add('disabled');
      return false;
    }
  }

  sendFruitFormData = (event) => {
    event.preventDefault()
    this.validateFormData() && this.props.receiveFormData(this.state.fruitName, this.state.fruitWeight, this.state.fruitFSize)
  }

  unrenderCreateForm = () => {
    this.props.unrenderForm()
  }

  render() {
    return (
      <div className='col-sm-6 col-sm-offset-3'>
        <form>
          <div className='form-group'>
            <label htmlFor='fruitname'> Name</label>
            <input type='text' placeholder='Mango ... ' className='form-control' onChange={this.handleFruitNameChange} name='fruitname' id='fruitNameInput' /> 
            {this.state.nameInValid && <p className='input-err'> ** Name Invalid</p>}
          </div>

          <div className='form-group'>
            <label htmlFor='fruitWeight'> Weight</label>
            <input type='text' placeholder='240 pounds ... ' className='form-control' onChange={this.handleFruitWeightChange} name='fruitweight' id='fruitWeightInput'/> 
            {this.state.weightInValid && <p className='input-err'> ** Weight Invalid</p>}
          </div>

          <div className='form-group'>
            <label htmlFor='fruitFSize'> FSize</label>
            <input type='number' placeholder='15 ...' className='form-control' onChange={this.handleFruitFSizeChange} name='fruitFSize' id='fruitFSizeInput'/>
            {this.state.fSizeInValid && <p className='input-err'> ** FSize Invalid</p>}
          </div>

          <div className='form-group'>
            <button className='btn btn-primary' onClick={this.sendFruitFormData} type='submit' id='createFruitBtn'> Submit</button>
            <button type='cancel' className='btn btn-default' onClick={this.unrenderCreateForm}> Cancel </button>
          </div> 
        </form>
      </div>
    )
  }
}