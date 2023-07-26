import React,{useState} from 'react';
import './App.css';
import Login from './components/Login/Login'
import Header from './components/Header/Header';

function App(props) {
  
  const[isLoggedIn,setLoggedIn]=useState(false);

 
  
  const logoutHandler=(e)=>{
    e.preventDefault();
    setLoggedIn(false);   
  }


  return (
  <>
  <Header isLoggedIn={isLoggedIn} onLogout={logoutHandler} ></Header>
  
  <Login setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn}  

    ></Login>
  </> 
  );
}

export default App;
