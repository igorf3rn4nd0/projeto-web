import React, { Component } from 'react';
import MyInput from './MyInput';
import '../style/Cadastro.css';
import axios from 'axios';
import { isMobile } from 'react-device-detect'
import NotifyError from './NotifyError'

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
        let campos = ['nome', 'email', 'senha', 'confirmacaoSenha']
        campos.forEach((campo) => {
            if ((!this.state[campo]) || this.state[campo].length < 3) {
                erros.push(campo)
            }
        })
        if (erros.length === 0) {
            if (this.state.senha === this.state.confirmacaoSenha) {
                axios.post('https://reqres.in/api/register', { email: this.state.email, password: this.state.senha })
                    .then((response) => {
                        this.props.onCadastrar(response.data);
                    }).catch(() => {
                    this.refs.NotifyError.abrir('Usuário ou senha incorretos!')
                })
            } else {
                this.refs.NotifyError.abrir('As senhas informadas não batem!')
            }
        } else {
            this.refs.NotifyError.abrir('Por favor preencha todas as informações! Cada campo deve contar 3 ou mais caracteres')
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
        let classNameCardCadastro
        if (isMobile) {
            classNameCardCadastro = 'Cadastro-card-mobile'
        } else {
            classNameCardCadastro = 'Cadastro-card'
        }
        return (
            /*onChange={event => onChange(changeValue('Nome', event.target.value))}*/
            <div className={classNameCardCadastro}>
                <NotifyError ref="NotifyError"/>
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
