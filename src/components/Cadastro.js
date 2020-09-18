import React, { Component } from 'react';
import MyInput from './MyInput';
import '../style/Cadastro.css';
import axios from 'axios';

class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.nome = React.createRef();

        this.state = {
            nome: '',
            email: '',
            senha: '',
            confirmacaoSenha: ''
        }
        this.cadastrar = this.cadastrar.bind(this);
    }

    cadastrar () {
        let erros = []
        Object.entries(this.state).forEach((obj) => {
            if ((!obj.value) || obj.value.length < 3) {
                erros.push(obj.key)
            }
        })
        if (erros.length === 0) {
            axios.post('https://reqres.in/api/register', { email: this.state.email, password: this.state.senha })
                .then((response) => {
                    this.props.onCadastrar(response.data);
                }).catch(() => {
                alert('Usuário ou senha incorretos!')
            })
        } else {
            alert('Por favor preencha todas as informações! Cada campo deve contar 3 ou mais caracteres')
        }
        /*
        {
                login: this.state.login,
                senha: this.state.senha,
                confirmacaoSenha: this.state.confirmacaoSenha,
                nome: this.state.nome
            }
        */
    }

    render () {
        return (
            /*onChange={event => onChange(changeValue('Nome', event.target.value))}*/
            <div className="Cadastro-card">
                <span className="Title">Cadastrar-se</span>
                <MyInput label={'Nome'} onChange={(event) => { this.setState({nome:event.target.value}) }} value={this.state.nome}/>
                <MyInput label={'E-mail'} onChange={(event) => { this.setState({email:event.target.value}) }} value={this.state.email}/>
                <MyInput label={'Senha'} onChange={(event) => { this.setState({senha:event.target.value}) }} value={this.state.senha}/>
                <MyInput label={'Confirmar Senha'} onChange={(event) => { this.setState({confirmacaoSenha:event.target.value}) }} value={this.state.confirmacaoSenha}/>
                <button onClick={(event) => this.cadastrar()} className="Botao-entrar">Cadastrar</button>
                <div className="Voltar-area"><span onClick={this.props.onVoltar} className="Voltar">Voltar</span></div>
            </div>
        )
    }
}

export default Cadastro;
