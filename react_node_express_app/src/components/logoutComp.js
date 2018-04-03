import React from 'react';
import axios from 'axios';

export default class LogoutComp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isUserLogged: this.props.isLoggedUser,
      errMsg: ""
    }
  }
  componentDidMount(){
    this.state.isUserLogged ? this.logOut() : this.setState({ errMsg: "Please Log in first before logging out"})
  }

  logOut = () => {
    axios.get('/api/user/logout').then(res => {
      this.props.logoutUser(res.data.inSession)
    }).catch(err => console.log(err))
  }

  render(){
    return(
      <div className='col-sm-4 col-sm-offset-1 mt32'>
        {this.state.isUserLogged && <p> Logout Successful</p>}
        {!this.state.isUserLogged && <p> {this.state.errMsg} </p>}
      </div>
    )
  }
}