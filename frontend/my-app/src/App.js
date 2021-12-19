import React from 'react';
import Loginpage from './components/login'
import './App.css'
import Homepage from './components/home'

export default  class App extends React.Component {

constructor(){
super()
this.state={loggedIn:false}

}


render(){

if(!(localStorage.getItem("TK"))){
  return (
   <Loginpage></Loginpage>
  );
  }
else{
  return(
   <Homepage></Homepage>
  )
}

}

} 


