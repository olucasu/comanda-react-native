import React , {Component} from 'react';
import {Text,View, FlatList, TouchableOpacity} from 'react-native';
import VistaAPI from '../../api/VistaAPI';
import Loader from '../../components/Helpers/loader';
import { withNavigation } from 'react-navigation';
import {styles} from "../../components/Styles";
import EmptyResult from "../../components/Helpers/EmptyResult";
class ListaProduto extends Component {

    constructor(props){
        super(props)


        this.state = {
            isLoading: false,
            produtos: [],
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

        const myString = this.props.uriInputBusca;
    
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
      this.setState({produtos: responseJson}, this.isNotLoading)

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
      if(nextProps.uriInputBusca) {
        this.setState({uri:nextProps.uriInputBusca})
        return this.fetchData();
    }
  }

  componentWillUnmount(){
      return false
  }

  navigate(params){
    if(this.props._closeModal)
        this.props._closeModal();
    
    this.props.navigation.navigate('AdicionaProduto', params);
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
                        styles={styles.list}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.produtos}
                        activeOpacity={0.9}
                        renderItem={({item}) => {
                        const params = {
                            produto: item
                        }

                        return(
                            <TouchableOpacity 
                            style={styles.listItem} onPress={ () => this.navigate(params)}  ><Text style={styles.text}>{item.produto_descricao}</Text></TouchableOpacity>
                        )
                    }}
                />
                )
            }

        }
    }
}

export default withNavigation(ListaProduto);