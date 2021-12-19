import React from 'react';
import '../App.css'
export default class  Note extends React.Component {
  

constructor(){
    super()
    
}



  render(){
  
    return (
        <div className="card bg-light mb-3">
        <div className="card-header">{new Date(this.props.lastedited).toLocaleDateString()}</div>
        <div className="card-body">
    <h5 className="card-title">{this.props.header}</h5>
          <p className="card-text">{this.props.content}</p>
        </div>
      </div>
  );
    }
}



