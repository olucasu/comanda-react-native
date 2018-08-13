import React, { Component } from 'react'
import VistaAPI from '../../api/VistaAPI'
import { ScrollView, Button, View } from 'react-native'
import Token from '../../auth/Token'

export default class Pedido extends Component {
  constructor (props) {
    super(props)
    this.Token = new Token()
    this.state = {
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

  async fetchData () {
    this.setState({
      isLoading: true
    })

    const api = new VistaAPI()

    api.create({
      apiMethod: 'GetGrupos',
      uri: ''
    })

    let response = await api.get()
    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()
      console.log(responseJson)
      this.setState({
        categoriasProduto: responseJson,
        isLoading: false,
        error: false
      })
    } else {
      this.setState({
        isLoading: false,
        error: response.error
      })
    }
  }

  componentDidMount () {
    this.fetchData()
  }

  mudarValorCategoria (itemValue) {
    this.buscaProdutoCategoria(itemValue)
  }

  async buscaProdutoCategoria (categoria) {
    this.setState({
      categoriaSelecionada: categoria
    })

    api.create({
      uri: 'GetProdutos/2/' + categoria
    })

    let response = await api.response()

    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()
    }
  }

  async buscaProdutoPorNome (key) {
    if (key.nativeEvent.key == 'Backspace') return false

    const string = this.state.nomeProduto
    let uri = !isNaN(string)
      ? 'GetProdutos/2/0/' + string
      : 'GetProdutos/2/0/0/' + string.toUpperCase()

    api.create({ uri: uri })

    if (!isNaN(string) || string.length > 3) {
      if (string === '') return false

      let response = await api.response()

      if (typeof response !== 'undefined' && response.ok) {
        let responseJson = await response.json()
      }
    }
  }

  async enviarPedido () {
    
    this.setState({
      isLoading: true
    })

    let usuario = await this.Token.getUsuarioAsync();
    usuario = JSON.parse(usuario);

    
    console.dir(usuario);

    const produto = {
      id_mesacartao: 9,
      id_colaborador: 1033,
      id_empresa: 2,
      id_cliente: 1,
      id_fpagto: 1,
      id_portador: 1,
      id_usuario: 1,
      data_caixa: '13/08/2018',
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
        qtde: produto.qtd,
      }
    ]

    return console.dir(pedido);

    const api = new VistaAPI()

    api.create({
      apiMethod: 'ItemVenda'
    })

    let response = await api.post()

    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()

      if (responseJson) console.dir(responseJson)

      alert('Pedido enviado')
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
    console.log(this.state)
    return (
      <ScrollView style={{ padding: 20 }}>
        <View style={{ marginBottom: 30 }}>
          <Button onPress={() => this.enviarPedido()} title='Enviar Pedido' />
        </View>
      </ScrollView>
    )
  }
}
