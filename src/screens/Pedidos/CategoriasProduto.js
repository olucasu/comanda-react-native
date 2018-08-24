import React, { Component } from 'react'
import { View, Text ,SafeAreaView, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import Loader from '../../components/Helpers/loader';
import ListaProduto from './ListaProduto';
import ModalListaProduto from './ModalListaProduto';
import VistaAPI from '../../api/VistaAPI';
import { styles } from '../../components/Styles';

class CategoriasProduto extends Component {
  
  constructor (props) {
    super(props)

    this.state ={
      isLoading: false,
      categoriasProduto:[],
      categoriaSelecionada: "",
      listarProdutosIsVisible: false
    }

    this._renderContent = this._renderContent.bind(this);
    this._closeModal = this._closeModal.bind(this);
  } 


  _renderSectionTitle(section) {
    return (
     <View>
           <Text>{section.title}</Text>
       </View>
    );
  }
 
  _renderHeader(section) {
    return (
      <View style={{height:40, backgroundColor: '#eee'}}>
          <Text style={{fontSize: 24}}>{section.title}</Text>
      </View>
    );
  }
 
  _renderContent(component, index , isActive) {
    if(isActive) {
      return (
        <ScrollView  nestedScrollEnabled={true} style={{backgroundColor:"#F44336"}}>
          <ListaProduto  categoria={component}  isActive={isActive} />

        </ScrollView>
      );
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
      this.setState({
        isLoading: false,
        categoriasProduto:  responseJson,
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

  _toggleModal(){
    this.setState({listarProdutosIsVisible: true})
  }

  _closeModal() {
    this.setState({listarProdutosIsVisible:false});
  }

  selecionarCategoria(categoria){
    this.setState({categoriaSelecionada:categoria})
    this._toggleModal();
  }

  render () {

    if( this.state.isLoading) {
     return(
      <Loader />
     ) 
    } else {

      return (
        
        <ScrollView >

          <FlatList 
          
            keyExtractor={(item, index) => index.toString()}
            data={this.state.categoriasProduto}
            renderItem={({item}) => {
                return(
                    <TouchableOpacity activeOpacity={0.9} style={styles.categoriaItem} onPress={()=>this.selecionarCategoria(item)}><Text style={[styles.text, styles.categoriaText]}>{item.grupo_descricao}</Text></TouchableOpacity>
                )
            }}
          />
       
          <ModalListaProduto _checarPedidoButton={this.props._checarPedidoButton} categoriaSelecionada={this.state.categoriaSelecionada} modalIsVisible={this.state.listarProdutosIsVisible} _closeModal={this._closeModal}    />
        </ScrollView>
      )
    }
  }
}



export default CategoriasProduto;

