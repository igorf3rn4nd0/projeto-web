import React, { Component } from 'react';
import MyInput from './MyInput'
import axios from 'axios'
import '../style/Login.css'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            senha: ''
        }
        this.entrar = this.entrar.bind(this);
    }
    entrar () {
        if (this.state.email && this.state.senha) {
            // 'eve.holt@reqres.in'
            // 'cityslicka'
            axios.post('https://reqres.in/api/login', { email: this.state.email, password: this.state.senha })
                .then((response) => {
                    this.props.onEntrar(response.data);
                }).catch(() => {
                alert('Usuário ou senha incorretos!')
            })
        } else {
            alert('Por favor informe usuário e senha')
        }
    }
    render () {
        return (
            /*onChange={event => onChange(changeValue('Nome', event.target.value))}*/
            <div className="Login-card">
                <span className="Title">Entrar</span>
                <MyInput onChange={(event) => { this.setState({email:event.target.value}) }} label={'E-mail'} value={this.state.email}/>
                <MyInput onChange={(event) => { this.setState({senha:event.target.value}) }} label={'Senha'} value={this.state.senha}/>
                <button onClick={(event) => this.entrar()} className="Botao-entrar">Entrar</button>
                <div className="Cadastrar-area"><span className="Cadastrar-pergunta">Não tem uma conta?</span><span onClick={this.props.onCadastrar} className="Cadastrar-se">Cadastre-se</span></div>
            </div>
        )
}
}

export default Login;
