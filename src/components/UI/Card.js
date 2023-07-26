import React from 'react';
import './Card.css';
const Card=(props)=>{
    return(
        <div className="card"><div>{props.children}</div>
        </div>
    )
}
export default Card;