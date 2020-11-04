import React, { Component } from 'react';
import './style/App.css';
import TelaInicial from "./components/TelaInicial";
import CadastrosConteudo from "./components/CadastrosConteudo";
import Home from './components/Home'

class App extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isAdm: false,
            rota: 'TelaInicial',
            token: ''
        }
        this.entrou = this.entrou.bind(this)
        this.saiu = this.saiu.bind(this)
        this.state.token = localStorage.getItem('token')
        this.state.isAdm = localStorage.getItem('isAdm')
        console.log('this.state.isAdm: ', this.state.isAdm)
        console.log('this.state.token: ', this.state.token)

        if (this.state.token) {
            console.log(typeof this.state.isAdm)
            if (this.state.isAdm === 'true') {
                console.log('entrou')
                this.state.rota = 'CadastrosConteudo'
            } else {
                this.state.rota = 'Home'
            }
        }
    }

    changeRota (val) {
        this.setState({rota:val})
    }

    entrou (val) {
        localStorage.setItem('token', val.token)
        localStorage.setItem('isAdm', val.adm)
        this.setState({isAdm:val.adm})
        if (val.adm === true) {
            this.changeRota('CadastrosConteudo')
        } else {
            this.changeRota('Home')
        }
    }

    saiu (val) {
        this.setState({token:''})
        this.setState({isAdm:false})
        localStorage.setItem('token', '')
        localStorage.setItem('isAdm', false)
        this.changeRota('TelaInicial')
    }

    render() {
        if (this.state.rota === 'Home') {
            return (
                <Home onSair={(event) => this.saiu()}/>
            );
        } else if (this.state.rota === 'CadastrosConteudo') {
            return (
                <CadastrosConteudo onSair={(event) => this.saiu()}/>
            );
        } else if (this.state.rota === 'TelaInicial') {
            return (
                <TelaInicial onEntrou={(event) => this.entrou(event)}/>
            );
        }
    }
}

export default App;
