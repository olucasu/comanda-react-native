import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation'
import { Container } from 'native-base'
import Loader from '../../components/Helpers/loader';



class ProductTab extends Component{
  render(){
    return(
      <View>
           <Text>Produto View</Text>
       </View>
    )
  }
}

export default class CategoriasProduto extends Component {
  
  constructor (props) {
    super(props)

    this.state = {
      categorias: props.categorias
    }
   
  }

  render () {

    const categorias = [
      {
          id_grupo: 5,
          grupo_descricao: "CERVEJAS"
      },
      {
          id_grupo: 2,
          grupo_descricao: "COMODATOS"
      },
      {
          id_grupo: 1,
          grupo_descricao: "PADRAO"
      }
    ]

    routes= {};


    const getComponent = (categoria) => (<ProductTab categoria={categoria} /> )
   
    const tab = (categoria) => {
      const { t } = this.props;
      const screen = getComponent(categoria);
      return {
        screen: screen      
      }
    }
    categorias.map((categoria)=>{
      routes[categoria.grupo_descricao] =  tab(categoria)
    })

    console.dir(routes);

    const NavTabs = createMaterialTopTabNavigator(routes);

    return (
      <NavTabs />
    )
  }
}
