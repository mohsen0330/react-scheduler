import React from 'react'
import Button from './Button'


const User = (props) => {
    
    return <li>
        <span>Name: {}</span>
        {/* <span>Name: {props.children}, id:{props.id}, Color:{props.color}</span> */}
   
        <input onChange={props.changeEvent} value={props.children}/>
        <Button color='red' text={"Delete"} onClick={props.delEvent}></Button>
    </li>
    
}

export default User
