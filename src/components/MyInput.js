import React, { Component } from 'react';
import '../style/MyInput.css';

class MyInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            value: ''
        };
    }

    render () {
        return (
            <div className="Div-my-input">
                <span className="Label">{this.props.label}</span>
                <input onChange={this.props.onChange} className="My-input" value={this.props.value}/>
            </div>
        )
    }
}

export default MyInput;
