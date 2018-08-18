import React , {Component} from 'react';
import {Text,View, FlatList, TouchableOpacity} from 'react-native';
import VistaAPI from '../../api/VistaAPI';
import Loader from '../../components/Helpers/loader';
import { withNavigation } from 'react-navigation';

class ListaProduto extends Component {

    constructor(props){
        super(props)

        this.state = {
            isLoading: false,
            isActive: props.isActive,
            produtos: []
        }

    
    }
    
  async fetchData () {
    this.setState({
        isLoading: true
    })


    let categoriaId = this.props.categoria.id_grupo;

    const api = new VistaAPI()
    if(categoriaId == 1) 
        categoriaId = "";

    api.create({
      apiMethod: 'GetProdutos',
      uri: categoriaId
    })

    let response = await api.get()


    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()
        
        console.log(responseJson);
        this.setState({
            produtos: responseJson,
            isLoading: false
        })

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

  navigate(params){
    console.dir(this.props);
    this.props._closeModal();
    this.props.navigation.navigate('AdicionaProduto', params);
  }

  
  render(){

        if(this.state.isLoading){
            return(<Loader />)
        } else {
            return(
                <FlatList
                   
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.produtos}
                    renderItem={({item}) => {
                    const params = {
                        produto: item
                    }

                    return(
                        <TouchableOpacity 
                        style={
                            {padding:10, 
                            marginBottom: 5,
                            marginTop: 5, 
                            alignItems:"center" ,
                            elevation:1, 
                            backgroundColor: "#B0BEC5"
                           }} onPress={ () => this.navigate(params)}  ><Text style={{color: "#263238"}}>{item.produto_descricao}</Text></TouchableOpacity>
                    )
                }}
              />
            )
        }
    }
}

export default withNavigation(ListaProduto);