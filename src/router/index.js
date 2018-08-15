import React, { Component } from 'react'
import { styles, Colors } from '../components/Styles'
import { Icon } from 'native-base'
import { YellowBox } from 'react-native'
import {tests} from '../tests';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation'
import Menu from '../components/Menu'
import CustomDrawer from '../components/Menu/CustomDrawer'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

/*
  * Importando fluxo de autenticação
*/

import AuthLoading from '../auth/Loading'
import Login from '../auth/Login'

/*
    * Importando telas
*/

// Mesas
import Mesas from '../screens/Mesas';
import MesaDetails from '../screens/Mesas/MesaDetails';


// Pedidos
import Pedidos from '../screens/Pedidos';
import CategoriasProduto from '../screens/Pedidos/CategoriasProduto';
import ListaProduto from '../screens/Pedidos/ListaProduto';
import AdicionaProduto from '../screens/Pedidos/AdicionaProduto';


// Configurações
import Configuracoes from '../screens/Configuracoes'
import ConfigurarUrlServer from '../screens/Configuracoes/ConfigurarUrlServer'





/*
    * Navegação interna
*/

const InsideTabMesa = createMaterialTopTabNavigator(
  {
    Todas: {
      screen: Mesas,
      navigationOptions: () => {
        return {
          title: 'Todas'
        }
      }
    },
    LIVRE: {
      screen: Mesas,
      navigationOptions: () => {
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
        title: 'Reservadas'
      }
    }
  },
  {
    initialRouteName: 'Todas',
    lazy:true,
    removeClippedSubviews: true,
    tabBarOptions: {
      scrollEnabled: true,
      activeTintColor: Colors.primaryColor,
      inactiveTintColor: Colors.secondaryColor,
      style: styles.tabBar,
      pressOpacity: 0.3,
      labelStyle: styles.tabLabel,
      indicatorStyle: styles.tabIndicator,
      pressColor: Colors.primaryColor,
      tabStyle: styles.tab
    },
    initialLayout: {
      height: 30,
      width: 300
    },
  
    optimizationsEnabled: true,
  }
)

const MesasStack = createStackNavigator({
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
    },
    Pedidos : {
      screen: Pedidos,
      navigationOptions: ({ navigation }) => ({
        title: 'Produtos'
      })
    },
    ListaProduto: {
      screen: ListaProduto
    },
    AdicionaProduto: {
      screen:AdicionaProduto,
      navigationOptions:{
        title: "Adicionar Item"
      }
    }
  },{
      transitionConfig: () => ({
        transitionSpec: {
          duration: 200
        }
      })
    }
)



const ConfigStack = createStackNavigator({
  Configuracoes: {
    screen: Configuracoes,
    navigationOptions: ({ navigation }) => {
      return {
        title: 'Configurações',
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
  ConfigurarUrlServer: {
    screen: ConfigurarUrlServer,
    navigationOptions: {
      title: 'Configurar Servidor '
    }
  }
})

const AppNav = createDrawerNavigator( {
    Home: {
      screen: MesasStack,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: () => {
          return (
            <Icon
              name='home'
              type='Feather'
              style={{ fontSize: 18 }}
              color={Colors.secondaryColor}
            />
          )
        },
        title: 'Mesas'
      })
    },
    Configuracoes: {
      screen: ConfigStack,
      navigationOptions: ({ navigation }) => ({
        drawerIcon: () => {
          return (
            <Icon
              name='cogs'
              type='FontAwesome'
              style={{ fontSize: 18 }}
              color={Colors.secondaryColor}
            />
          )
        }
      })
    }
  },{
    contentComponent: CustomDrawer
  }
)

class WrapperWithRootNavigation extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return <AppNav screenProps={{ rootNavigation: this.props.navigation }} />
  }
}

const loginStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Configuracoes: {
    screen: Configuracoes,
    navigationOptions: {
      title: 'Configurações'
    }
  },
  ConfigurarUrlServer: {
    screen: ConfigurarUrlServer,
    navigationOptions: {
      title: 'Configurar Servidor '
    }
  }
})

const AppAuth = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: {
      screen: loginStack
    },
    AppNav: WrapperWithRootNavigation,
    tests: tests

  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export { AppAuth }
