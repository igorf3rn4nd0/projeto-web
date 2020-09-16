import React from 'react';
import MyInput from './MyInput'
import './Login.css'

let dadosLogin = {}

function changeValue (campo, valor) {
    dadosLogin[campo] = valor
    console.log('dadosLogin: ', dadosLogin[campo])
}

function entrar () {
    console.log('entrar')
}

function Login() {
    return (
        /*onChange={event => onChange(changeValue('Nome', event.target.value))}*/
        <div className="Login-card">
            <span className="Title">Nome Sistema</span>
            <MyInput onInput={event => changeValue('nome', event.target.value)} label={'Nome'} value={dadosLogin.nome}/>
            <MyInput onChange={event => changeValue('senha', event.target.value)} label={'Senha'} value={dadosLogin.senha}/>
            <button onClick={event =>  entrar()} className="Botao-entrar">Entrar</button>
        </div>
    );
}

export default Login;
