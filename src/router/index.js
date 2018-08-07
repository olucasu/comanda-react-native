import React, {Component} from 'react'
import { YellowBox } from 'react-native'
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation'
import Menu from '../components/Menu'

import {
  createMaterialBottomTabNavigator
} from 'react-navigation-material-bottom-tabs'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

/*
    * Importando telas
*/

import Mesas from '../screens/Mesas'
import MesaDetails from '../screens/Mesas/MesaDetails'
import Configuracoes from '../screens/Configuracoes'
import Login from '../screens/Login'

/*
    * Navegação interna
*/

const InsideTabMesa = createMaterialTopTabNavigator(
  {
    Todas: {
      screen: Mesas,
      navigationOptions: navigation => {
        return {
          title: 'Todas'
        }
      }
    },
    LIVRE: {
      screen: Mesas,
      navigationOptions: navigation => {
        return {
          title: 'Livre'
        }
      }
    },
    'OCUPADA(O)': {
      screen: Mesas,
      navigationOptions: {
        title: 'Ocupadas'
      }
    },
    CONTA: {
      screen: Mesas,
      navigationOptions: {
        title: 'Conta'
      }
    },
    'RESERVADA(O)': {
      screen: Mesas,
      navigationOptions: {
        title: 'Reservadas Com um belo titulo grande'
      }
    }
  },
  {
    tabBarOptions: {
      scrollEnabled: true,
    },
  
    lazy: true,
    initialRouteName: 'Todas',
    optimizationsEnabled : true
  }
)

const MesasNav = createStackNavigator({
  Mesas: {
    screen: InsideTabMesa,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Mesas',
        header: <Menu navigation={navigation} />,
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#2196F3',
          shadowRadius: 0,
          elevation: 0
        },
        headerTitleStyle: {
          fontWeight: '300'
        }
      }
    }
  },
  Details: {
    screen: MesaDetails,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('screenTitle', 'Mesa não identificada')
    })
  }
},
{   
  transitionConfig: () => ({
    transitionSpec: {
      duration: 200
    },
  })
})






/*
  *Autenticação
*/

const LoginStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions : navigator => {
      return {
        title: 'Login'
      }
    }
  },
  Configuracoes : {
    screen: Configuracoes
  }  
})


/*
    * Navegação Geral
*/
export class AppNav extends Component {
  render(){
    return(
      createDrawerNavigator({
        Home: {
          screen: MesasNav,
          navigationOptions: ({ navigation }) => ({
            tabBarIcon: () => {
              return <Icon name='home' type='material-community' color='#517fa4' />
            },
            title: 'Mesas'
          })
        },
        Configuracoes: {
          screen: Configuracoes,
          navigationOptions: ({ navigation }) => ({
            tabBarIcon: () => {
              return <Icon name='cogs' type='material-community' color='#517fa4' />
            }
          })
        }
      })
    )
  }
}

export class Auth extends Component {
  render(){
    return(
      createSwitchNavigator({
        Login: {
          screen: LoginStack
        }
      })
    )
  }
}