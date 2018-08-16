import React, { Component } from 'react'
import VistaAPI from '../../api/VistaAPI'
import { ScrollView, Button, View, Alert } from 'react-native'
import Token from '../../auth/Token'

import CategoriasProduto from './CategoriasProduto'
import { Container } from 'native-base'
import Loader from '../../components/Helpers/loader'

export default class Pedido extends Component {
  constructor (props) {
    super(props)
    this.Token = new Token()

    this.state = {
      pedido: [],
      categoriasProduto: [],
      navigate: this.props.navigation.getParam('navigate', 'Não informado'),
      id: this.props.navigation.getParam('id', 'Não informado'),
      status: this.props.navigation.getParam('status', 'Não informado'),
      screnTitle: this.props.navigation.getParam(
        'screenTitle',
        'Não informado'
      ),
      idVenda: this.props.navigation.getParam('idVenda', 'Não informado'),
      dataAbertura: this.props.navigation.getParam(
        'dataAbertura',
        'Não informado'
      )
    }

    this.addItemComanda = this.addItemComanda.bind(this)
  }

  async addItemComanda (item) {
    let usuario = await this.Token.getUsuarioAsync()
    usuario = JSON.parse(usuario)

    item.id_mesacartao    = this.state.id
    item.id_colaborador   = usuario.id_colaborador
    item.id_usuario       = usuario.id_usuario
    item.id_empresa       = usuario.id_empresa
    item.id_cliente       = usuario.id_cliente
    item.id_fpagto        = usuario.id_fpagto
    item.id_portador      = usuario.id_portador
    item.data_caixa       = usuario.caixa_abertura
    item.vlr_vendido      = parseFloat(item.vlr_vendido)

    this.state.pedido.push(item)

    console.log(this.state.pedido)
  }

  async enviarPedido () {
    this.setState({
      isLoading: true
    })

    const updateMesa = this.props.navigation.getParam(
      'updateMesa',
      'Não informado'
    )

    const pedido = this.state.pedido

    if (pedido.length > 0) {
      const api = new VistaAPI()

      api.create({
        apiMethod: 'ItemVenda',
        body: JSON.stringify(pedido)
      })

      let response = await api.post()

      console.log(response)

      try {
        if (typeof response !== 'undefined' && response.ok) {
          let responseJson = await response.json()
          console.log(responseJson)
          if (responseJson.vStatusRetorno) {
            updateMesa()
            this.props.navigation.goBack()
          } else {
            alert(responseJson.vMesangemRetorno)
          }
        } else {
          console.log(response.error)
          this.setState({ isLoading: false })
        }
      } catch (e) {
        console.log(e)
        this.setState({ isLoading: false })
      }
    } else {
      alert('Pedido Vazio')
      this.setState({
        isLoading: false
      })
    }
  }

  inputBuscaPrduto () {
    return (
      <TextInput
        placeholder='Buscar produto por nome'
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={nomeProduto => {
          this.setState({ nomeProduto: nomeProduto })
        }}
        onKeyPress={key => {
          this.buscaProdutoPorNome(key)
        }}
        value={this.state.nomeProduto}
      />
    )
  }

  render () {
    if (this.state.isLoading) {
      return <Loader />
    } else {
      this.props.screenProps.addItemComanda = this.addItemComanda

      return (
        <Container style={{ justifyContent: 'space-between' }}>
          <CategoriasProduto />
          <Button onPress={() => this.enviarPedido()} title='Enviar Pedido' />
        </Container>
      )
    }
  }
}
