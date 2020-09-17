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
        // todo api
        console.log('usuario: ', val)
        this.props.onEntrou()
    }

    onCadastrar (val) {
        console.log('teste: ', val)
        this.props.onEntrou()
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
