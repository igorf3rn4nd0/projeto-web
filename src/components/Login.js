import React, { Component } from 'react';
import MyInput from './MyInput'
import axios from 'axios'
import '../style/Login.css'
import { isMobile } from 'react-device-detect'

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
            if (this.state.email.length >= 3 && this.state.senha.length >= 3) {
                // 'eve.holt@reqres.in'
                // 'cityslicka'
                axios.post('https://reqres.in/api/login', { email: this.state.email, password: this.state.senha })
                    .then((response) => {
                        this.props.onEntrar(response.data);
                    }).catch(() => {
                    alert('Usuário ou senha incorretos!')
                })
            } else {
                alert('Cada campo deve contar 3 ou mais caracteres!')
            }
        } else {
            alert('Por favor informe usuário e senha')
        }
    }

    keyPress(e){
        if(e.keyCode === 13){
            this.entrar()
        }
    }

    render () {
        let classNameCardLogin
        if (isMobile) {
            classNameCardLogin = 'Login-card-mobile'
        } else {
            classNameCardLogin = 'Login-card'
        }
        return (
            <div className={classNameCardLogin}>
                <span className="Title">Entrar</span>
                <MyInput onChange={(event) => { this.setState({email:event.target.value}) }} label={'E-mail'} value={this.state.email}/>
                <MyInput onKeyDown={(event) => this.keyPress(event)} onChange={(event) => { this.setState({senha:event.target.value}) }} label={'Senha'} value={this.state.senha}/>
                <button onClick={(event) => this.entrar()} className="Botao-entrar">Entrar</button>
                <div className="Cadastrar-area"><span className="Cadastrar-pergunta">Não tem uma conta?</span><span onClick={this.props.onCadastrar} className="Cadastrar-se">Cadastre-se</span></div>
            </div>
        )
    }
}

export default Login;
