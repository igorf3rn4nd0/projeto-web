import React, { Component } from 'react'
import '../style/NovoRegistro.css'
import { isMobile } from 'react-device-detect'
import MyInput from './MyInput'

class NotifyError extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalAberto: false,
            Poster: '',
            Title: '',
            Year: '',
            Director: '',
            imdbRating: ''
        }
        this.fechar = this.fechar.bind(this);
    }

    fechar () {
        this.setState({modalAberto:false})
    }

    salvar () {
        // this.setState({modalAberto:false})
    }

    abrir (texto) {
        this.setState({modalAberto:true})
    }

    render () {
        let classCard
        if (isMobile) {
            classCard = 'Card-mobile'
        } else {
            classCard = 'Card'
        }
        if (this.state.modalAberto) {
            return (
                <div className="Modal">
                    <div className={classCard}>
                        <button onClick={(event) => this.fechar()} className="Fechar">X</button>
                        <div className="Center">
                            <MyInput onChange={(event) => { this.setState({Poster:event.target.value}) }} label={'Poster'} value={this.state.Poster}/>
                            <MyInput onChange={(event) => { this.setState({Title:event.target.value}) }} label={'Título'} value={this.state.Title}/>
                            <MyInput onChange={(event) => { this.setState({Year:event.target.value}) }} label={'Ano'} value={this.state.Year}/>
                            <MyInput onChange={(event) => { this.setState({Director:event.target.value}) }} label={'Diretor'} value={this.state.Director}/>
                            <MyInput onChange={(event) => { this.setState({imdbRating:event.target.value}) }} label={'Nota'} value={this.state.imdbRating}/>
                        </div>
                        <button onClick={(event) => this.salvar()} className="Botao-salvar">Salvar</button>
                    </div>
                </div>
            )

        } else {
            return null
        }
    }
}

export default NotifyError;
