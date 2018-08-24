import React , {Component} from 'react';
import {Text,View, FlatList, TouchableOpacity} from 'react-native';
import VistaAPI from '../../api/VistaAPI';
import Loader from '../../components/Helpers/loader';
import {_formatMoney} from '../../components/Helpers/uiHelper';
import { withNavigation } from 'react-navigation';
import {styles} from "../../components/Styles";
import EmptyResult from "../../components/Helpers/EmptyResult";
class ListaProduto extends Component {

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            produtos: null,
            uri:"",
        }
    }

    
  isNotLoading(){
    this.setState({isLoading:false})
    this.forceUpdate();
 }

  async fetchData () {


    this.setState({
        isLoading: true
    })


    const api = new VistaAPI()

    let uri = "";

    if(this.props.categoria) {
        let categoriaId = this.props.categoria.id_grupo;

        if(categoriaId == 1) 
            categoriaId = "";
        

        uri = categoriaId;

    } else if(this.props.uriInputBusca) {

        const myString = this.props.uriInputBusca.trim();
    
        // Id Grupo/Id Produto/myString Nome do produto  -- :)
        uri = !isNaN(myString) ? '0/' + myString : '0/0/' + myString.toUpperCase()
    } 

        api.create({
        apiMethod: 'GetProdutos',
        uri: uri
    })

    
    let response = await api.get()

    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()
      
      if(responseJson != null) {
        return this.setState({produtos: responseJson}, this.isNotLoading)
      } else {
        return this.setState({isLoading:false})
      }

    } else {
      this.setState({
        isLoading: false,
        error: response.error
      })
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentWillReceiveProps(nextProps) {
      if( nextProps.uriInputBusca && nextProps.keyPressed !== "Backspace") {
        return this.setState({uri:nextProps.uriInputBusca},this.fetchData);
      }
  }

  navigate(params){
    if(this.props._closeModal)
        this.props._closeModal();
    
    this.props.navigation.navigate('AdicionaProduto', params);
  }

  addOne(produto){
     const addItemComanda = this.props.navigation.getScreenProps().addItemComanda;

     const produtoEnviado = {
        qtde: 1,
        id_produto: produto.id_produto,
        complemento:"",
        vlr_vendido: produto.pvenda,
        estoque: produto.saldo_geral,
        descricao: produto.produto_descricao,
        unidade: produto.unidade,
    }

    addItemComanda(produtoEnviado);
        
  }

  render(){
        
        if(this.state.isLoading){
            return(<Loader />)
        } else {

            if( this.state.produtos == null || ! this.state.produtos) {
                return(
                    <EmptyResult message="Nenhum produto encontrado" />
                )
            } else{
                    
                return(
                    <FlatList
                        styles={[styles.list]}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.produtos}
                        activeOpacity={0.9}
                        renderItem={({item}) => {
                        const params = {
                            produto: item
                        }
                        return(
                            <View style={styles.sideBySide}>
                               
                                <TouchableOpacity 
                                    style={[styles.listItem, styles.listItemBig]} onPress={ () => this.navigate(params)}  >
                                    <Text style={styles.text}>{`${item.produto_descricao} - R$${_formatMoney(item.pvenda)}`}</Text>
                                </TouchableOpacity>
                            
                                <TouchableOpacity onPress={( )=>this.addOne(item)} style={[styles.buttonSmLeft, styles.buttonPrimary]}>
                                    <Text style={styles.buttonLightText}>+1</Text>
                                </TouchableOpacity>

                            </View>
                           
                        )
                    }}
                />
                )
            }

        }
    }
}

export default withNavigation(ListaProduto);