import React from 'react';
import  './Header.css';
import Button from '../UI/Button';
const Header=(props)=>{

return(<div className="Header"> {!props.isLoggedIn && 
    <div>
         {!props.signIn && <p >Login</p>}
         {props.signIn && <p >Sign In</p>}
         </div>
         }
   
    {props.isLoggedIn && 
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <Button onClick={props.onLogout}>Logout</Button>

        </ul>}
    </div>
   
)   
}
export default Header;