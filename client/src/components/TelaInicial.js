import React, { Component } from 'react'
import Login from "./Login"
import Cadastro from "./Cadastro"

class TelaInicial extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rota: 'Login'
        }
        this.changeRota = this.changeRota.bind(this)
    }

    changeRota (val) {
        this.setState({rota:val})
    }

    onEntrar (val) {
        this.props.onEntrou(val)
    }

    onCadastrar (val) {
        this.props.onEntrou(val)
    }

    render () {
        if (this.state.rota === 'Login') {
            return <Login onEntrar={(event) => this.onEntrar(event)} onCadastrar={(event) => this.changeRota('Cadastro')}/>
        } else if (this.state.rota === 'Cadastro') {
            return <Cadastro onCadastrar={(event) => this.onCadastrar(event)} onVoltar={(event) => this.changeRota('Login')}/>
        }
    }
}

export default TelaInicial;
