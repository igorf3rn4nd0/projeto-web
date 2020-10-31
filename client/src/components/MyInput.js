import React, { Component } from 'react';
import '../style/MyInput.css';

class MyInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            value: '',
            placeholder: ''
        };
    }

    render () {
        return (
            <div className="Div-my-input">
                <span className="Label">{this.props.label}</span>
                <input onKeyDown={this.props.onKeyDown} onChange={this.props.onChange} className="My-input" value={this.props.value} placeholder={this.props.placeholder}/>
            </div>
        )
    }
}

export default MyInput;
