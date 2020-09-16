import React from 'react';
import './MyInput.css'

function MyInput(props) {
  return (
    <div className="Div-my-input">
        <span className="Label">{props.label}</span>
        <input onChange={props.onInput} className="My-input" value={props.value}/>
    </div>
  );
}

export default MyInput;
