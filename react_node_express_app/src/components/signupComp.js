import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

export default class SignupComp extends React.Component{
  constructor(){
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConf: "",
      usernameBlank: true,
      emailBlank: true,
      passwordBlank: true,
      passwordConfBlank: true,
      usernameInvalid: false,
      emailInvalid: false,
      passwordInValid: false,
      passwordConfInValid: false,
      passwordsDontMatch: false,
      userNameTaken: false,
      takenUsernameVal: "",
      emailTaken: false,
      takenEmailVal: false,
      searchResults: [],
      allRegEmails: [],
      allRegUsernames: [],
      regSuccess: false
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handlePassConfChange = this.handlePassConfChange.bind(this)
    this.sendSignupFormData = this.sendSignupFormData.bind(this)
  }

  componentDidMount(){
    this.getAllEmail()
  }
  
  getAllEmail = () => {
    axios.get('/api/user/alluserdata').then( (res) => {
      res.data.allUserData.map(row => (
        this.setState({ allRegEmails: [...this.state.allRegEmails, row.email], allRegUsernames: [...this.state.allRegUsernames, row.username] })
      ))
    }).catch(err => console.log(err))
    
  }

  checkUsernameTaken = (searchQuery) => {
    var searchRes = this.state.allRegUsernames;
    const result = searchRes.find(uname => uname === searchQuery)
    if (result){
      this.setState({ userNameTaken: true, takenUsernameVal: searchQuery})
    } 
  }

  checkEmailTaken = (searchQuery) => {
    var searchRes = this.state.allRegEmails;
    const result = searchRes.find(email => email === searchQuery)
    if (result) {
      this.setState({ emailTaken: true, takenEmailVal: searchQuery })
    }
  }

  handleUserNameChange = (event) => {
    event.target.value ? this.setState({ usernameBlank: false, usernameInvalid: false }) : this.setState({ usernameBlank: true, usernameInvalid: true })
    this.setState({ username: event.target.value })
    this.checkUsernameTaken(event.target.value) 
  }

  handleEmailChange = (event) => {
    event.target.value ? this.setState({ emailBlank: false, emailInvalid: false }) : this.setState({ emailBlank: true, emailInvalid: true })
    this.setState({ email: event.target.value })
    this.checkEmailTaken(event.target.value) 
  }

  handlePassChange = (event) => {
    event.target.value ? this.setState({ passwordBlank: false, passwordInValid: false }) : this.setState({ passwordBlank: true, passwordInValid: true })
    this.setState({ password: event.target.value })
  }

  handlePassConfChange = (event) => {
    event.target.value ? this.setState({ passwordConfBlank: false, passwordConfInValid: false, passwordsDontMatch: false }) : this.setState({ passwordConfBlank: true, passwordConfInValid: true })
    this.setState({ passwordConf: event.target.value })
  }

  passwordsMatch = () => {
    if (this.state.password !== this.state.passwordConf) {
      this.setState({ passwordsDontMatch: true })
      return false;
    } else {
      this.setState({ passwordsDontMatch: false })
      return true
    }
  }

  sendSignupFormData = (event) => {
    event.preventDefault()
    if (!this.state.usernameBlank && !this.state.passwordBlank && !this.state.emailBlank && !this.state.passwordConfBlank && this.passwordsMatch()) {
      axios.post('/api/user/new', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }).then((res) => {
        if (res.data.regSucceess){
          this.setState({ regSuccess: true })
          this.emptyForm()
        }
      }).catch(err => console.log(err))
    } 
    if (this.state.usernameBlank ){
      this.setState({ usernameInvalid: true })
    } 
    if (this.state.passwordBlank){
      this.setState({ passwordInValid: true })
    }
    if (this.state.emailBlank) {
      this.setState({ emailInvalid: true })
    } 
    if (this.state.passwordConfBlank){
      this.setState({ passwordConfInValid: true })
    }
  }

  emptyForm = () => {
    document.getElementById('emailInput').value = ""
    document.getElementById('usernameInput').value = ""
    document.getElementById('passwordInput').value = ""
    document.getElementById('passwordConfInput').value = ""
    document.getElementById('passwordConfInput').value = ""
  }

  render(){
    return(
      <div className='col-sm-4 col-sm-offset-4 mt32'> 
        <form>

          {this.state.passwordsDontMatch && 
            <div className='alert alert-danger alert-dismissible' role="alert">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <p> <i className='fa fa-exclamation-triangle'> </i> Passwords Don't Match! </p>
            </div>
          }  

          {this.state.userNameTaken && 
            <div className='alert alert-danger alert-dismissible' role="alert">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <p> <i className='fa fa-exclamation-triangle'> </i> Username <strong> {this.state.takenUsernameVal} </strong> Already taken</p>
            </div>
          } 

          {this.state.emailTaken &&
            <div className='alert alert-danger alert-dismissible' role="alert">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <p> <i className='fa fa-exclamation-triangle'> </i> Email <strong> {this.state.takenEmailVal} </strong> Already taken</p>
            </div>
          }

          {this.state.regSuccess &&
            <div className='alert alert-success alert-dismissible' role="alert">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <p> <i className='fa fa-check'> </i> Registration Successful </p>
              <p> Please <NavLink to='/login'>Login</NavLink> with your credentials</p>
            </div>
          }    

          <div className="form-group">
            <label htmlFor='username'> Username</label>
            <input type='text' placeholder='Username' name='username' className={'form-control'} onChange={this.handleUserNameChange} id='usernameInput' />
            {this.state.usernameInvalid && <p className='input-err'> ** UserName Required</p>}
          </div>

          <div className="form-group">
            <label htmlFor='username'> Email</label>
            <input type='text' placeholder='Email' name='email' className={'form-control'} onChange={this.handleEmailChange} id='emailInput' />
            {this.state.emailInvalid && <p className='input-err'> ** Email Required</p>}
          </div>

          <div className="form-group">
            <label htmlFor='password'> Password</label>
            <input type='password' placeholder='****' name='password' className={'form-control'} onChange={this.handlePassChange} id='passwordInput' />
            {this.state.passwordInValid && <p className='input-err'> ** Password Required</p>}
          </div>

          <div className="form-group">
            <label htmlFor='passwordconf'> Confirm</label>
            <input type='password' placeholder='****' name='passwordconf' className={'form-control'} onChange={this.handlePassConfChange} id='passwordConfInput' />
            {this.state.passwordConfInValid && <p className='input-err'> ** Pass Confirmation Required</p>}
          </div>

          <div className="form-group">
            <button type='submit' className='btn btn-primary' onClick={this.sendSignupFormData} id='createUserBtn'> Sign Up </button>
          </div>
        </form>
      </div>
    )
  }
}