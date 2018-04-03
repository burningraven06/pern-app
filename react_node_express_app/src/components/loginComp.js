import React from 'react';
import axios from 'axios';

export default class LoginComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      userLoggedIn: false,
      loggedUserName: "",
      loginError: "",
      usernameBlank: true,
      passwordBlank: true,
      usernameInvalid: false,
      passwordInValid: false,
    }
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.sendLoginFormData = this.sendLoginFormData.bind(this);
  }

  handleUserNameChange = (event) =>{
    event.target.value ? this.setState({ usernameBlank: false, usernameInvalid: false }) : this.setState({ usernameBlank: true, usernameInvalid: true })
    this.setState({ username: event.target.value})
  }

  handlePassChange = (event) => {
    event.target.value ? this.setState({ passwordBlank: false, passwordInValid: false }) : this.setState({ passwordBlank: true, passwordInValid: true })
    this.setState({ password: event.target.value})
  }

  sendLoginFormData = (event) => {
    event.preventDefault()
    if (!this.state.usernameBlank && !this.state.passwordBlank){
      axios.post('/api/user/login', {
        username: this.state.username, password: this.state.password
      }).then(res => {
        if (res.data.incorrectUsername || res.data.incorrectPassword ){
          this.setState({ loginError: res.data.msg})
        }
        this.props.checkStatus(res.data.inSession, res.data.loggedUserName)
        this.setState({ userLoggedIn: res.data.inSession, loggedUserName: res.data.loggedUserName})
      }).catch(err => console.log(err))
    } else{
      this.setState({ usernameInvalid: true, passwordInValid: true})
    }
  }

  render(){
    return(
      <div className='col-sm-4 col-sm-offset-1 mt32'> 
        {this.state.userLoggedIn && <p> Welcome {this.state.loggedUserName} </p>}
        {!this.state.userLoggedIn && <form> 
          
          {this.state.loginError && <div className='alert alert-warning' role="alert"> 
            <p> <i className='fa fa-exclamation-triangle'> </i> <strong> {this.state.loginError} </strong> </p>
          </div>
          }

	        <h3 className='mb24'> Login </h3>

          <div className="form-group">
            <label htmlFor='username'> Username</label>
            <input type='text' placeholder='Username' name='username' className={'form-control'} onChange={this.handleUserNameChange} id='usernameInput' />
            {this.state.usernameInvalid && <p className='input-err'> ** Username Required</p>}
          </div>

          <div className="form-group">
            <label htmlFor='password'> Password</label>
            <input type='password' placeholder='****' name='password' className={'form-control'} onChange={this.handlePassChange} id='passwordInput' />
            {this.state.passwordInValid && <p className='input-err'> ** Password Required</p>}
          </div>
          
          <div className="form-group">
            <button type='submit' className='btn btn-primary' onClick={this.sendLoginFormData} id='loginBtn'> Login </button>
          </div>
        </form>  
        }
      </div>
    )
  }
}
