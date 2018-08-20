import React, { Component } from 'react';
import VistaAPI from '../../api/VistaAPI';
import { View, Alert, ToastAndroid, TextInput , TouchableOpacity, Text} from 'react-native';
import Token from '../../auth/Token';
import {styles, Colors} from '../../components/Styles'
import CategoriasProduto from './CategoriasProduto';
import { Container } from 'native-base';
import Loader from '../../components/Helpers/loader';
import ModalConfirmaPedido from './ModalConfirmaPedido';


export default class Pedido extends Component {
  constructor (props) {
    super(props)
    this.Token = new Token()

    this.state = {
      inputBuscaPorNome:"",
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
      ),
      enviarPedidoIsVisible: false
    }

    this._toggleModal = this._toggleModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this.enviarPedido = this.enviarPedido.bind(this);

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

      try {
        if (typeof response !== 'undefined' && response.ok) {
          let responseJson = await response.json()

          if (responseJson.vStatusRetorno) {
            
            updateMesa()

            ToastAndroid.show('Pedido Enviado!', ToastAndroid.SHORT);
           
            this.props.navigation.navigate("Pedidos");

            this.props.navigation.goBack()

          } else {

            alert(responseJson.vMesangemRetorno)

          }

        } else {

          this.setState({ isLoading: false , error: response.error })

        }
      } catch (e) {
        console.log(e)
        this.setState({ isLoading: false })
      }
    } else {
      Alert.alert('Opa', 'O pedido está vazio!');
      this.setState({
        isLoading: false
      })
    }
 
 
  
  
  
    
  }

  _toggleModal(){
    this.setState({enviarPedidoIsVisible: true})
  }

  _closeModal(){
    this.setState({enviarPedidoIsVisible:false})
  }


  async buscaProdutoPorNome (key) {


    if (key.nativeEvent.key == 'Backspace') return false


    const string = this.state.inputBuscaPorNome
    const api = new VistaAPI()

    // Id Grupo/Id Produto/string Nome do produto  -- :)

    let uri = !isNaN(string) ? '0/' + string : '0/0/' + string.toUpperCase()
    
    api.create({ 
        uri: uri,
        apiMethod: 'GetProdutos' 
    })

    if (!isNaN(string) || string.length > 3) {
     
      if (string === '') return false

      let response = await api.get()

      if (typeof response !== 'undefined' && response.ok) {
        let responseJson = await response.json()

        this.setState({isLoading:false})
        console.log(responseJson);
      }
    }
  }


  inputBuscaProduto () {
    
   

    return (
      <TextInput
        placeholder='Buscar produto por nome ou código'
        underlineColorAndroid ={Colors.primary.lightColor}
        onChangeText={inputBuscaPorNome => {
          this.setState({ inputBuscaPorNome: inputBuscaPorNome })
        }}
        onKeyPress={key => {
          this.buscaProdutoPorNome(key)
        }}
        value={this.state.inputBuscaPorNome}
      />
    )
  }


  _checarPedidoButton(){

      return(
        <View style={[styles.buttonContainer]}>
            <TouchableOpacity activeOpacity={0.9} style={[styles.button,styles.buttonPrimary]} onPress={() => this._toggleModal()}>
                <Text style={styles.buttonLightText}>
                  {this.state.pedido.length > 0 ? "Enviar Pedido" : "Checar Pedido"}
                </Text>
            </TouchableOpacity>
      </View>
      )
  
  }


  render () {
    if (this.state.isLoading) {
      return <Loader />
    } else {
      this.props.screenProps.addItemComanda = this.addItemComanda
      return (
        <Container style={{ flex:1, justifyContent: 'space-between' }}>
          <View style={styles.viewHeaderSearch}>
              {this.inputBuscaProduto()}
          </View>
          <CategoriasProduto />
          { this._checarPedidoButton()}
          <ModalConfirmaPedido pedido={this.state.pedido} modalIsVisible={this.state.enviarPedidoIsVisible} _enviarPedido ={this.enviarPedido} _closeModal={this._closeModal}    />
        </Container>
      )
    }
  }
}
