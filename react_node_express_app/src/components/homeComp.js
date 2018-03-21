import React from 'react';

export default class HomeComp extends React.Component{


   render(){
      return(
         <div className='col-sm-10 col-sm-offset-1'>
          <h1> Hello</h1>
            <p className='mt32'> This is a demo app, built with Node.js, Express.js, React.js & PostgreSQL </p>
            <p> Please sign up and then log in to use the app</p>
            <p className='mt32'> Thank you for your interest & Have a nice day</p>
         </div>
      )
   }   
}



