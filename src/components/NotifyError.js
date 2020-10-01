import React, { Component } from 'react'
import '../style/NotifyError.css'
import { isMobile } from 'react-device-detect'

class NotifyError extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalAberto: false,
            texto: ''
        }
        this.fechar = this.fechar.bind(this);
    }

    fechar () {
        this.setState({modalAberto:false})
    }

    abrir (texto) {
        this.setState({modalAberto:true})
        this.setState({texto:texto})
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
                        <div className="Titulo">Atenção!</div>
                        <div className="Texto">{this.state.texto}</div>
                        <button onClick={(event) => this.fechar()} className="Botao-fechar">Entendi</button>
                    </div>
                </div>
            )

        } else {
            return null
        }
    }
}

export default NotifyError;
