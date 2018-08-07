import React, { Component } from 'react'
import VistaAPI from '../../api/VistaAPI'
import {
  ScrollView,
  Picker,
  TextInput,
  Button
} from 'react-native'

export default class MesaDetails extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      status: 'desocupada',
      modalVisible: false,
      categoriasProduto: [],
      categoriaSelecionada: '',
      nomeProduto: ''
    }
  }

  async fetchData () {
    this.setState({
      isLoading: true
    })

    VistaAPI.create({
      uri: 'GetGrupos/2/',
      method: 'GET'
    })

    let response = await VistaAPI.response()

    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()

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

  componentWillMount(){
    this.fetchData()
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

    VistaAPI.create({
      uri: 'GetProdutos/2/' + categoria
    })

    let response = await VistaAPI.response()

    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()

    }
  }

  async buscaProdutoPorNome (key) {
   
    if(key.nativeEvent.key == "Backspace")
      return false;

    const string = this.state.nomeProduto;
    let uri = ! isNaN(string) ? 'GetProdutos/2/0/'+ string : 'GetProdutos/2/0/0/' + string.toUpperCase();

    VistaAPI.create({uri: uri})
    
    if( ! isNaN(string) || string.length > 3) {
      if(string === '') return false;
     
      let response = await VistaAPI.response()

      if (typeof response !== 'undefined' && response.ok) {
        let responseJson = await response.json()
      }
    }


  }

  async enviarPedido(){

    VistaAPI.create({method:'POST'})
    
    VistaAPI.setCustomEndPoint('https://jsonplaceholder.typicode.com/posts')
    
    
    let response = await VistaAPI.post()

    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()
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
          this.setState({nomeProduto:nomeProduto})
        }}
        onKeyPress={(key)=>{ this.buscaProdutoPorNome(key)}}
        value={this.state.nomeProduto}
      />
    )
  }

  render () {
    return (
      <ScrollView>
        {this.listaCategorias()}
        {this.inputBuscaPrduto()}
        <Button onPress={()=> this.enviarPedido()} title='Enviar Pedido'/>
      </ScrollView>
    )
  }
}
