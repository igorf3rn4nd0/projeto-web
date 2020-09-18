import React, { Component } from 'react';
import './style/App.css';
import TelaInicial from "./components/TelaInicial";
import Home from './components/Home'

class App extends Component{
    constructor(props) {
        super(props);

        this.state = {
            rota: 'TelaInicial',
            token: ''
        }
        this.entrou = this.entrou.bind(this)
        this.saiu = this.saiu.bind(this)
        this.state.token = localStorage.getItem('token')
    }

    changeRota (val) {
        this.setState({rota:val})
    }

    entrou (val) {
        console.log('val: ', val)
        localStorage.setItem('token', val.token)
        this.setState({usuario:val})
        this.changeRota('Home')
    }

    saiu (val) {
        this.setState({token:''})
        localStorage.setItem('token', '')
        this.changeRota('TelaInicial')
    }

    render() {
        console.log('token: ', this.state.token)
        if (this.state.rota === 'Home' || this.state.token) {
            return (
                <Home onSair={(event) => this.saiu()}/>
            );
        } else if (this.state.rota === 'TelaInicial') {
            return (
                <TelaInicial onEntrou={(event) => this.entrou(event)}/>
            );
        }
    }
}

export default App;
