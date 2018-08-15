import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation'
import Loader from '../../components/Helpers/loader';
import ListaProduto from './ListaProduto';
import VistaAPI from '../../api/VistaAPI';
import Accordion from 'react-native-collapsible/Accordion';
import { Container, Header, Content, List, ListItem } from 'native-base';




class CategoriasProduto extends Component {
  
  constructor (props) {
    super(props)

    this.state ={
      isLoading: false,
      categoriasArr:[],
      categoriasProduto:[],
      buscandoProduto: false
    }

    this.triggerBuscarProduto = this.triggerBuscarProduto.bind(this);
    this._renderContent = this._renderContent.bind(this);
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
        <ListaProduto navigate={this.props.navigate} categoria={component}  isActive={isActive} />
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

      let categoriasArr = [];

      responseJson.map(function(categoria){
        let obj = {};

        obj["title"] = categoria.grupo_descricao;
        obj["id"] = categoria.id_grupo;

        categoriasArr.push(obj);
      });
      this.setState({
        categoriasProduto: responseJson,
        isLoading: false,
        categoriasArr: categoriasArr,
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

  triggerBuscarProduto(){
    this.setState({buscandoProduto: true})
  }

  render () {


   

    if( this.state.isLoading) {
     return(
      <Loader />
     ) 
    } else {
      let SECTIONS = [
        {
          title: 'Categoria1',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at condimentum enim. Fusce vitae tellus at nisi posuere consequat. Suspendisse euismod hendrerit mi vitae rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris commodo diam vel tellus dictum ornare. Morbi at velit ex. Mauris nibh ante, pharetra non mauris a, volutpat mattis ante. Suspendisse dignissim ex diam, quis feugiat lacus tincidunt eget. Nunc mattis sagittis orci vitae cursus. Vivamus mollis, ligula ut sollicitudin lacinia, ipsum ante eleifend sapien, et placerat ligula risus at sapien. Donec vitae tempor dui, vel eleifend diam. Morbi eu lobortis dui. Phasellus posuere diam in tempus aliquam. '
        },
        {
          title: 'Categoria2',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at condimentum enim. Fusce vitae tellus at nisi posuere consequat. Suspendisse euismod hendrerit mi vitae rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris commodo diam vel tellus dictum ornare. Morbi at velit ex. Mauris nibh ante, pharetra non mauris a, volutpat mattis ante. Suspendisse dignissim ex diam, quis feugiat lacus tincidunt eget. Nunc mattis sagittis orci vitae cursus. Vivamus mollis, ligula ut sollicitudin lacinia, ipsum ante eleifend sapien, et placerat ligula risus at sapien. Donec vitae tempor dui, vel eleifend diam. Morbi eu lobortis dui. Phasellus posuere diam in tempus aliquam.'
        }
      ];

      const sections = this.state.categoriasArr;

      return (
        <ScrollView>
        <Accordion 
        onAnimationEnd={()=>{this.triggerBuscarProduto()}}
        sections={sections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
      </ScrollView>
      )
    }
  }
}



export default CategoriasProduto;

