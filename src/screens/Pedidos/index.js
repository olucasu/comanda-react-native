import React, { Component } from 'react';
import VistaAPI from '../../api/VistaAPI';
import { View, Alert, ToastAndroid, TextInput , TouchableOpacity, Text} from 'react-native';
import Token from '../../auth/Token';
import {styles, Colors} from '../../components/Styles'
import CategoriasProduto from './CategoriasProduto';
import { Container, Icon } from 'native-base';
import Loader from '../../components/Helpers/loader';
import ModalConfirmaPedido from './ModalConfirmaPedido';
import ListaProduto from './ListaProduto';


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
      screenTitle: this.props.navigation.getParam(
        'screenTitle',
        'Não informado'
      ),
      idVenda: this.props.navigation.getParam('idVenda', 'Não informado'),
      dataAbertura: this.props.navigation.getParam(
        'dataAbertura',
        'Não informado'
      ),
      enviarPedidoIsVisible: false,

      inputBuscaPorNome:"",
      isFetchingByInputBusca: false,
      queryForSearch:""
    }

    this._toggleModal = this._toggleModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this.enviarPedido = this.enviarPedido.bind(this);
    this.handleSearch  = this.handleSearch.bind(this)
    this.startSearch = this.startSearch.bind(this);
    this.addItemComanda = this.addItemComanda.bind(this);
    this._checarPedidoButton = this._checarPedidoButton.bind(this);
    this.props.screenProps.addItemComanda = this.addItemComanda;
    this.props.screenProps.pedido = this.state.pedido;
    this.setPedido = this.setPedido.bind(this);

  }

  setPedido(pedido){
    this.setState({pedido:pedido})
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

          
    let pedido = this.state.pedido; 

    if(pedido.length > 0) {
      
      // Se essa variavel for verdaeira, NAO será adicionado um novo ITEM        
      let itemAdicionadoEstaNoPedido = false;

      // Se essa variavel for verdaeira, SERÁ adicionado um novo ITEM      
      let itemAdicionadoTemComplemento = false;
        
      pedido.map((itemNoPedido)=>{

          //  Item adcionado tem complemento
          if( item.complemento != "") {

              //  Se o complemento for identico ao item do pedido como tambem seu id
              if(itemNoPedido.complemento === item.complemento && itemNoPedido.id_produto == item.id_produto){
                  itemAdicionadoEstaNoPedido = true;
                  itemNoPedido.qtde = parseInt(item.qtde) + parseInt(itemNoPedido.qtde);
                  itemNoPedido.vlr_vendido = parseInt(itemNoPedido.qtde) * parseFloat(item.vlr_unidade); 
              } 
              
              //  Item adicionado existe no pedido, e ambos item adicionado e existente nao tem complemento
            } else if( itemNoPedido.id_produto === item.id_produto  && itemNoPedido.complemento == "" ){
                itemAdicionadoTemComplemento = false;
                itemAdicionadoEstaNoPedido = true;
                itemNoPedido.qtde = parseInt(item.qtde) + parseInt(itemNoPedido.qtde);
                itemNoPedido.vlr_vendido = parseInt(itemNoPedido.qtde) * parseFloat(item.vlr_unidade); 
                
            } 

            // Se passar direto adiciona um novo item do mesmo jeito já que
            // "itemAdicionadoEstaNoPedido " é falso
 
       });
      

      if( ! itemAdicionadoEstaNoPedido || itemAdicionadoTemComplemento) {
        item.vlr_vendido =  parseInt(item.qtde) * parseFloat(item.vlr_unidade);
        item.qtde = parseInt(item.qtde);
        pedido.push(item);
      }

    } else {
      item.vlr_vendido = parseInt(item.qtde) * parseFloat(item.vlr_unidade);
      item.qtde = parseInt(item.qtde);
      pedido.push(item);
    }
  
    ToastAndroid.show(`Adicionado ${item.qtde} ${item.descricao} ao pedido para envio`, ToastAndroid.SHORT);
    
    this.forceUpdate();
  }
  
  /**
   * Método que dispara o envio de pedido
  */
 
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

      pedido.map(p => {
        p.vlr_vendido = p.vlr_unidade
      })



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

            Alert.alert('Opa', 'Não foi possível enviar o pedido! \n'+ response.vStatusRetorno);
            this.setState({
              isLoading: false,
              error: response.vStatusRetorno
            })

          }  

        } else {

          responseJson = await response.json();

          typeof response.error == 'undefined' || ! response.error ? response.error = "Ocorreu um erro inesperado." : "";  
          Alert.alert('Opa', 'Não foi possível enviar o pedido! \n'+ response.error);
          this.setState({
            isLoading: false,
            error: response.error
          })

        }
      } catch (e) {
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

  /**
   * Método Callback para lidar com o onChange do campo
  */

  handleSearch (stringEmpty, string) { 

    if(stringEmpty) {
      return this.setState({ inputBuscaPorNome: "",isFetchingByInputBusca: false})
    }

    this.setState( () => {
      return { inputBuscaPorNome:string, isFetchingByInputBusca: false}
    });
  }

  /**
   * Método que dispara a busca
   */

  startSearch(){

    /**
     * Valor atual do input 
    */  
    const inputValue = this.state.inputBuscaPorNome.trim();
   
    /**
     * Irá armazenar o estado anterior do componente
     */
    let firstPrevState = {};
  
    /**
     * Verifica se a string submetida é diferente da anterior.
     * 
     * Evita busca pela mesma string.
     */
    const isSameSearch = (prevString, nextString) => {
      return (prevString.length > 0 && prevString == nextString) 
    }
    
    /**
     * Callback para ser executado somente após "setState".
     * 
     * (setState não é sincrono)
    */
    const thenSearch = () => {
       if(isSameSearch(firstPrevState.queryForSearch,inputValue)) return null
        this.setState( {isFetchingByInputBusca:true});
    }

    if(inputValue.length > 0) {
      return this.setState( (prevState) => {
        
        //Mantendo o estado anterior para usar em "thenSearch"
        firstPrevState = prevState;
        
        if(isSameSearch(prevState.queryForSearch,inputValue)) return null;

        //Alterando estado do componente
        return{queryForSearch:this.state.inputBuscaPorNome}}, thenSearch) 
    }

  }

   /**
   * Retorna o componente de busca
   */

  inputBuscaProduto () {
    return (
      <View style={[styles.buttonContainer, {flexDirection:'row'}]}>
          <TextInput
            style={[styles.inputShadow, {flex:1}]}
            
            placeholder='Buscar por código ou nome'
            underlineColorAndroid = "transparent"
            placeholderTextColor={Colors.primary.textDark}
            onSubmitEditing = { this.startSearch }
            onKeyPress={(e)=> {  this.state.key = e.nativeEvent.key }}
            onChangeText={(inputBuscaPorNome) => {
              if( inputBuscaPorNome.length <= 0) return this.handleSearch(true)
                this.handleSearch(false,inputBuscaPorNome)
            }}
            value={this.state.inputBuscaPorNome}
          />
            <TouchableOpacity activeOpacity={0.9} style={[styles.buttonSecondary, styles.buttonInputGroup]} onPress = { this.startSearch }>
                <Icon
                    name='search'
                    type='MaterialIcons'
                    style={{ fontSize: 20 ,color: Colors.primary.textOnPrimary}}
                    color={Colors.primary.lightColor}
                  />
            </TouchableOpacity>
          </View>
          
    )
  }

   /**
   * Retorna o Botão para checar os pedido 
   * 
   * Dispara Modal
   */

  _checarPedidoButton(){
      return(
        <View style={styles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.9} style={[styles.button,styles.buttonPrimary]} onPress={() => this._toggleModal()}>
                <Text style={styles.buttonLightText}>
                  Checar Pedido
                </Text>
            </TouchableOpacity>
       </View>
    )
  }

  render () {

    if (this.state.isLoading) {
      return <Loader />
    } else {
      if( ! this.state.isFetchingByInputBusca)  {
        return (
          <Container style={styles.container}>
            <View style={styles.viewHeaderSearch}>
                {this.inputBuscaProduto()}
            </View>
            <CategoriasProduto _checarPedidoButton={this._checarPedidoButton} />
            { this._checarPedidoButton()}
            <ModalConfirmaPedido setPedido={this.setPedido} mesa={this.state.screenTitle} pedido={this.state.pedido} modalIsVisible={this.state.enviarPedidoIsVisible} _enviarPedido ={this.enviarPedido} _closeModal={this._closeModal}    />
          </Container>
        )
      } else {
        return(
          <Container style={styles.container}>
            <View style={styles.viewHeaderSearch}>
                {this.inputBuscaProduto()}
            </View>
            <ListaProduto keyPressed={this.state.key} uriInputBusca={this.state.queryForSearch} />
            { this._checarPedidoButton()}
            <ModalConfirmaPedido setPedido={this.setPedido} mesa={this.state.screenTitle} pedido={this.state.pedido} modalIsVisible={this.state.enviarPedidoIsVisible} _enviarPedido ={this.enviarPedido} _closeModal={this._closeModal}    />
          </Container>
        )
      }
    }
  }
}
