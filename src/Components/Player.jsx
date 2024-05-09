import React, { useState } from 'react'
export default function Player({name, symbol, isActive, onChangeName}) {
     const [ isEditing, setIsEditing ]=useState(false)
     const [ playrName, setplayrName ]=useState(name)

     function handelEditClick() {
        // update the state base on the perv value is by arrow funciton
        // this function will called by react and take the prev value by react, will return an new state
        // using just !isEditing , react sceduling the state, its not prefome instantliy
        setIsEditing(() => !isEditing)
        if(isEditing){
        onChangeName(symbol, playrName)
        }
     }
     function handelChange(event) {
        setplayrName(event.target.value)
     }
    return (
        <li className={isActive? 'active' : undefined}>
        <span className="player">
            {
            isEditing ? 
            <input type="text" required value={playrName} onChange={handelChange}/> 
            : <span className="player-name"> {playrName} </span>
            }
          <span className="player-symbol"> {symbol} </span>
          </span>
          <button onClick={handelEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}