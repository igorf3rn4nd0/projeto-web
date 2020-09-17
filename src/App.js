import React, { Component } from 'react';
import './style/App.css';
import TelaInicial from "./components/TelaInicial";
import Home from './components/Home'

class App extends Component{
    constructor(props) {
        super(props);

        this.state = {
            rota: 'TelaInicial'
        }
    }

    changeRota (val) {
        this.setState({rota:val})
    }

    render() {
        if (this.state.rota === 'TelaInicial') {
            return (
                <TelaInicial onEntrou={(event) => this.changeRota('Home')}/>
            );
        } else if (this.state.rota === 'Home') {
            return (
                <Home/>
            );
        }
    }
}

export default App;
