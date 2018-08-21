import React , {Component} from 'react';
import {Text,View, FlatList, TouchableOpacity} from 'react-native';
import VistaAPI from '../../api/VistaAPI';
import Loader from '../../components/Helpers/loader';
import { withNavigation } from 'react-navigation';
import {styles} from "../../components/Styles";
class ListaProduto extends Component {

    constructor(props){
        super(props)


        this.state = {
            isLoading: false,
            produtos: [],
            uri:'',
        }
    
    }
    
  async fetchData () {
    this.setState({
        isLoading: true
    })


    const api = new VistaAPI()

    if(this.props.categoria) {
        let categoriaId = this.props.categoria.id_grupo;

        if(categoriaId == 1) 
            categoriaId = "";
        
         this.setState({uri:categoriaId})
    
    }

    api.create({
        apiMethod: 'GetProdutos',
        uri: this.state.uri
    })

    let response = await api.get()


    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()

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
    this.props._closeModal();
    this.props.navigation.navigate('AdicionaProduto', params);
  }

  render(){


        if(this.state.isLoading){
            return(<Loader />)
        } else {
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

export default withNavigation(ListaProduto);