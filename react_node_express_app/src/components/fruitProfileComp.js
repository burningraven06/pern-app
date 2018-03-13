import React from 'react';
export default class FruitProfileComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      theSingleFruit: {},
      isEditing: false,
      editedFruitName: "",
      editedFruitWeight: "",
      editedFruitFSize: ""
    }
    this.editModeOn = this.editModeOn.bind(this)
    this.editModeOff = this.editModeOff.bind(this)
    this.handleFruitNameChange = this.handleFruitNameChange.bind(this)
    this.handleFruitWeightChange = this.handleFruitWeightChange.bind(this)
    this.handleFruitFSizeChange = this.handleFruitFSizeChange.bind(this)
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

  updateFruit = () => {
    this.editModeOff()
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
                    <input type='text' className='form-control' name='fruitName' defaultValue={this.state.editedFruitName} onChange={this.handleFruitNameChange} id='fruitNameInput' /> <br/>

                    <label htmlFor='fruitWeight'> Weight </label>
                    <input type='text' className='form-control' name='fruitWeight' onChange={this.handleFruitWeightChange} defaultValue={this.state.editedFruitWeight} id='fruitWeightInput' /> <br/>

                    <label htmlFor='fruitFSize'> FSize </label>
                    <input type='text' className='form-control' name='fruitFSzie' onChange={this.handleFruitFSizeChange} defaultValue={this.state.editedFruitFSize} id='fruitFSizeInput' />

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