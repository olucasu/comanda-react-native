import React, { Component } from 'react'
import VistaAPI from '../../api/VistaAPI'
import { ScrollView, Button, View } from 'react-native'
import Token from '../../auth/Token';

import CategoriasProduto from './CategoriasProduto';
import ListaProduto from './ListaProduto';
import { Container } from 'native-base';
import Loader from '../../components/Helpers/loader';

 export default class Pedido extends Component {
  
  constructor (props) {
    super(props)
    this.Token = new Token()
 
    this.state = {
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
  }

  async enviarPedido () {

    this.setState({
      isLoading: true
    })
    
    const updateMesa = this.props.navigation.getParam('updateMesa', 'Não informado');
    
    let usuario = await this.Token.getUsuarioAsync();
  
    usuario = JSON.parse(usuario);

    const produto = {
      id_produto: 1389,
      complemento: 'Complemento do Produto',
      pvenda: 5.15,
      qtde: 4
    }

    const pedido = [
      {
        id_mesacartao: this.state.id,
        id_usuario: usuario.id_usuario,
        id_colaborador: usuario.id_colaborador,
        id_empresa: usuario.id_empresa,
        id_cliente: usuario.id_cliente,
        id_fpagto: usuario.id_fpagto,
        id_portador: usuario.id_portador,
        data_caixa: usuario.caixa_abertura,
        id_produto: produto.id_produto,
        complemento: produto.complemento,
        vlr_vendido: produto.pvenda,
        qtde: produto.qtde,
      }
    ]



    const api = new VistaAPI()

    api.create({
      apiMethod: 'ItemVenda',
      body: JSON.stringify(pedido)
    })

    let response = await api.post()

    if (typeof response !== 'undefined' && response.ok) {

      let responseJson = await response.json()

      if(responseJson.vStatusRetorno) {


        updateMesa();
        this.props.navigation.goBack();

      } else {
        alert(responseJson.vMesangemRetorno);
      }

    }
  }

  listaCategorias () {
    if (
      typeof this.state.categoriasProduto !== 'undefined' &&
      this.state.categoriasProduto.length > 0
    ) {
      let list = this.state.categoriasProduto.map(item => {
        return (
          <Picker.Item
            key={item.id_grupo}
            label={item.grupo_descricao}
            value={item.id_grupo}
          />
        )
      })
      return (
        <Picker
          placeholder='Selecione uma categoria'
          selectedValue={this.state.categoriaSelecionada}
          onValueChange={(itemValue, itemIndex) =>
            this.mudarValorCategoria(itemValue)}
        >
          <Picker.Item key={0} label={'Selecione uma Categoria'} value={''} />
          {list}

        </Picker>
      )
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

    if(this.state.isLoading) {
      return(
        <Loader />
      )
    } else {

      return (
        <Container style={{justifyContent:'space-between'}}>
            <CategoriasProduto navigate={this.state.navigate} />
            <Button onPress={() => this.enviarPedido()} title='Enviar Pedido' />
        </Container>
      )
    }
 
  }

}



