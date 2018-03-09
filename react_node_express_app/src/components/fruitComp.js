import React from 'react';
export default class FruitComp extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         allFruits: []
      }
   }

   componentDidMount(){
      this.setState({
         allFruits: this.props.theFruits
      })
   }

   render(){
      return (
         <div>
            <div className='col-md-6'>
            1. {
                  this.state.allFruits.map((fruit) => (
                     <div className='col-md-4 col-sm-4' key={fruit.id}>
                        <h4 style={{ fontSize: fruit.fSize }}>{fruit.name} </h4>
                        <p>
                           <i className='fa fa-scale'> </i> {fruit.weight}
                        </p>
                     </div>
                  ))
            }
            </div>
            <div className='col-md-6 hidden'>
            2. {
                  this.props.theFruits.map((fruit) => (
                     <div className='col-md-4 col-sm-4' key={fruit.id}>
                        <h4 style={{ fontSize: fruit.fSize }}>{fruit.name} </h4>
                        <p>
                           <i className='fa fa-scale'> </i> {fruit.weight}
                        </p>
                     </div>
                  ))
            }
            </div>
         </div>
      )
   }
}