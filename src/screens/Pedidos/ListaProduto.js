import React , {Component} from 'react';
import {Text,View, FlatList, TouchableOpacity} from 'react-native';
import VistaAPI from '../../api/VistaAPI';
import Loader from '../../components/Helpers/loader';

export default class ListaProduto extends Component {

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

    let categoriaId = this.props.categoria.id;
    console.log(categoriaId);

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
        
        this.setState({
            produtos: responseJson
        })

      this.setState({
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
    if(this.state.isActive) {
        this.fetchData()
        console.dir(this.state);
    }
  }
  render(){
        if(this.state.isLoading){
            return(<Loader />)
        } else {
            return(
                <FlatList
                keyExtractor={(item, index) => index}
                data={this.state.produtos}
                renderItem={({item}) => {
                    const params = {
                        produto: item
                    }
                    return(
                        <TouchableOpacity onPress={ () => this.props.navigate('AdicionaProduto', params)}  style={{marginBottom:12,backgroundColor:'#90CAF9'}}><Text>{item.produto_descricao}</Text></TouchableOpacity>
                    )
                }}
              />
            )
        }
    }
}