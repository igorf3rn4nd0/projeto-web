import React, { Component } from 'react'
import '../style/Home.css'
import axios from "axios";
import '../style/Spinner.css'
// import { isMobile } from 'react-device-detect'
import NotifyError from './NotifyError'
import NovoRegistro from './NovoRegistro'

class CadastrosConteudo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pesquisar: false,
            loading: false,
            textoPesquisa: '',
            filmes: []
        }

        axios.post('/api/listar-filmes')
            .then((response) => {
                this.setState({filmes:response.data})
                console.log('response.data: ', this.state.filmes)
            }).catch((error) => {
            this.refs.NotifyError.abrir(error && error.response ? error.response.data : 'Erro ao buscar informações do filme!')
        })
    }

    sair () {
        this.props.onSair()
    }

    onNovoRegistro () {
        this.refs.NovoRegistro.abrir()
    }

    render () {
        let SimpleList = null
        if (this.state.filmes.length > 0) {
            SimpleList =
                <ul className="Lista-filmes">
                    {this.state.filmes.map((filme) => <li className="Filme-item" key={filme._id}>{filme.Title}</li>)}
                </ul>
        }
        return (
            <div>
                <NotifyError ref="NotifyError"/>
                <NovoRegistro ref="NovoRegistro"/>
                <div className="Menu">
                    <ul id="Ul">
                        <li id="Li"> FILMES </li>
                        <li id="Li"> SÉRIES </li>
                        <li id="Li" onClick={event => this.sair()}> SAIR</li>
                    </ul>
                </div>
                <div className="Div-principal">
                    <div>
                        <div className="Wrapper">
                        </div>
                        <div className="Mid-pesquisa">
                            <a className="Button" onClick={event => this.onNovoRegistro()}>Novo Registro</a>
                            {SimpleList}
                        </div>
                    </div>{/*onClick={event => this.setState({pesquisar:true})}*/}
                </div>
            </div>
        );
    }
};

export default CadastrosConteudo;
