import React from 'react';
import logo from '../cloud.svg';
import '../App.css'
export default class  Login extends React.Component {
  

constructor(){
    super()
    this.state={email:"",password:""}
}


async submit(){


  console.log(this.validateEmail())
  
if(this.validateEmail()){

  const data=this.state
  const response=  await fetch('http://localhost:5000',{method:'POST',headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },body: JSON.stringify(data)})

const content=await response.json();
console.log(content)
if(content.message){}
else{
const token=content.token
localStorage.setItem("TK",token)
window.location.reload(false)
}

}

}


validateEmail(){
const email=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
console.log(this.state.email)
return  email.test(this.state.email)

}

  render(){
  
    return (
    <div >
      <header >
        <span className="Title">
          Cloud Notes
        </span>
       </header>
       <img src={logo} className="Cloud" alt="logo" />
        <form>
        
        <input type="email" className="email"placeholder="Email" onChange={ (e)=>{this.setState({email:e.target.value})} }  name="email"/>
        <input type="password" className="password" placeholder="Password" onChange={ (e)=>{this.setState({password:e.target.value})} }  name="password"/>
        </form>
        <button className='submit' onClick={()=>{this.submit()}} >Login</button>
        
       </div>
  );
    }
}



