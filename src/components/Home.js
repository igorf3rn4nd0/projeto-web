import React, { Component } from 'react'
import '../style/Home.css'
import logo from '../assets/logo.svg'
import axios from "axios";
import '../style/Spinner.css'
import { isMobile } from 'react-device-detect'

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pesquisar: false,
            loading: false,
            textoPesquisa: '',
            filme: {
                /*Title: 'Batman',
                imdbRating: 9.9,
                Poster: 'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg'*/
            }
        }
        this.pesquisar = this.pesquisar.bind(this)
    }

    sair () {
        this.props.onSair()
    }

    pesquisar (val) {
        this.setState({textoPesquisa:val})
        if (val && val.length > 3) {
            this.setState({loading:true})
            const campoPesquisa = val.replace(' ', '+')
            axios.post('//www.omdbapi.com/?t=' + campoPesquisa + '&apikey=efbb6c79')
                .then((response) => {
                    this.setState({filme:response.data})
                }).catch((error) => {
                alert(error.message)
            }).finally(() => {
                this.setState({loading:false})
            })
        } else {
            this.setState({filme: {}})
        }
    }

    render () {
        let elementoCentral
        let cardFilme
        let pesquisaSuperior

        if (this.state.loading) {
            cardFilme = <div className="loader">Loading...</div>
        } else if (this.state.filme && this.state.filme.Title) {
            cardFilme = <div className="Filme">
                <img className="Poster" src={this.state.filme.Poster} alt="Poster filme" />
                <span id="Info-filme">{this.state.filme.Title}</span>
                <span id="Info-filme">{this.state.filme.Year}</span>
                <span id="Info-filme">{this.state.filme.Director}</span>
                <span id="Nota">{this.state.filme.imdbRating}</span>
            </div>
        } else if (this.state.textoPesquisa) {
            cardFilme = <div className="Nenhum-filme">Nenhum resultado encontrado</div>
        } else {
            cardFilme = <div>
            </div>
        }

        if (this.state.pesquisar || isMobile) {
            pesquisaSuperior = <div>
            </div>
            elementoCentral =
                <div>
                    <div className="Wrapper">
                    </div>
                    <div className="Mid-pesquisa">
                        <input autoFocus onBlur={event => this.setState({pesquisar:false})} onChange={event => { this.pesquisar(event.target.value) }} className="Pesquisa-principal" placeholder={'Pesquisar'}/>
                        {cardFilme}
                    </div>
                </div>
        } else {
            pesquisaSuperior = <li id="Busca">
                <div className="divBusca">
                    <input onClick={event => this.setState({pesquisar:true})} type="text" id="TxtBusca" placeholder="Pesquisar" />
                </div>
            </li>
            elementoCentral = <div>
                <div className="Mid-container">
                    <div className="Row-mid">
                        <img className="Logo-maior" src={logo} alt="MyMovies.logo" />
                        <div className="Text">
                            Tudo Sobre Filmes.
                            <br />
                            Em um só Lugar.
                            <br />
                            <a className="Button" onClick={event => this.setState({pesquisar:true})}>Começar</a>
                        </div>
                    </div>
                </div>
                <div className="Fundo-logo">
                </div>
                <div className="Wrapper">
                </div>
            </div>
        }

        return (
            <div>
                <div className="Menu">
                    <ul id="Ul">
                        {/*<li id="small-logo"></li>*/}
                        <li id="Li"> FILMES </li>
                        <li id="Li"> SÉRIES </li>
                        <li id="Li" onClick={event => this.sair()}> SAIR</li>
                        {pesquisaSuperior}
                        <li id="icon1">
                            {/*<img className="icon1" src="./Angular_files/twitter-logo.png" alt="twitter-logo" />*/}
                        </li>
                        <li id="icon2">
                            {/*<img className="icon2" src="./Angular_files/github-logo.png" alt="github-logo" />*/}
                        </li>
                    </ul>
                </div>
                <div className="Div-principal">
                    {elementoCentral}
                </div>
            </div>
        );
    }
};

export default Home;
