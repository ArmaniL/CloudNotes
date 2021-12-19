import React from 'react';
import '../App.css'
import Note from './note'
export default class  HomePage extends React.Component {
  

constructor(){
    super()
    this.state={notes:[]}
}


componentDidMount(){

this.getNotes()


}


async getNotes(){
//Get token
const token=localStorage.getItem("TK")
//if token is valid 
if(token ){
//setup up fetch

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+token);
myHeaders.append("Content-Type", "application/json");
const requestOptions = {
  method: 'GET',
  headers: myHeaders
};

fetch("http://localhost:5000/notes", requestOptions)
  .then((response) => {
    if(response.status===403){

        localStorage.removeItem("TK")
    }
    else {
    return response.json()
  }
})
  .then((result) => {
    console.log(result)
    this.setState({notes:result.result})}
      
      )
  .catch(error => console.log('error', error));

}
  


}



  render(){
  
    return (
    <div >
      <header >
        <span className="Title">
          Cloud Notes
        </span>
       </header>
       
<div className="container"style={{paddingTop:"5vh"}} >

    {this.state.notes.map((note)=>{return<Note header={note.header} content={note.content} lastedited={note.updatedAt} ></Note>})}
</div>


       </div>
  );
    }
}



