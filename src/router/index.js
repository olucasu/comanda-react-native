import React, { Component } from 'react'
import { styles, Colors } from '../components/Styles'
import { Icon } from 'native-base'
import { YellowBox } from 'react-native'
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
    animationEnabled: false,
    tabBarOptions: {
      scrollEnabled: true,
      pressOpacity: 0.3,
      activeTintColor: Colors.primary.defaultColor,
      inactiveTintColor: Colors.primary.textDark,
      style: styles.tabBar,
      labelStyle: styles.tabLabel,
      indicatorStyle: styles.tabIndicator,
      pressColor: Colors.primary.defaultColor,
      tabStyle: styles.tab
    },
    initialLayout: {
      height: 30,
      width: 300
    },
  
  }
)

const MesasStack = createStackNavigator({
    Mesas: {
      screen: InsideTabMesa,
      navigationOptions: ({ navigation }) => {
        return {
          title: 'Mesas',
          header: <Menu navigation={navigation} />,
          headerTitleStyle: styles.headerText
        }
      }
    },
    Details: {
      screen: MesaDetails,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('screenTitle', 'Mesa não identificada'),
        headerStyle: {
          backgroundColor: Colors.primary.containerColor,
        },
        headerTintColor: Colors.primary.textDark,
        headerTitleStyle: styles.headerText
      })
    },
    Pedidos : {
      screen: Pedidos,
      navigationOptions: ({ navigation }) => ({
        title: 'Produtos',
        headerStyle: {
          backgroundColor: Colors.primary.containerColor,
        },
        headerTintColor: Colors.primary.textDark,
        headerTitleStyle: styles.headerText
      })
    },
    AdicionaProduto: {
      screen:AdicionaProduto,
      navigationOptions:{
        title: "Adicionar Item",
        headerStyle: {
          backgroundColor: Colors.primary.containerColor,
        },
        headerTintColor: Colors.primary.textDark,
        headerTitleStyle: styles.headerText
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
        headerStyle: {
          backgroundColor: Colors.primary.containerColor,
        },
        headerTintColor: Colors.primaryColor,
        headerTitleStyle: styles.headerText
      }
    }
  },
  ConfigurarUrlServer: {
    screen: ConfigurarUrlServer,
    navigationOptions: {
      title: 'Configurar Servidor ',
      headerStyle: {
        backgroundColor: Colors.primary.containerColor,
      },
      headerTintColor: Colors.primaryColor,
      headerTitleStyle: styles.headerText
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
      title: 'Configurações',
      headerStyle: {
        backgroundColor: Colors.primary.containerColor,
      },
      headerTintColor: Colors.primary.textDark,
      headerTitleStyle: styles.headerText
    }
  },
  ConfigurarUrlServer: {
    screen: ConfigurarUrlServer,
    navigationOptions: {
      title: 'Configurar Servidor',
      headerStyle: {
        backgroundColor: Colors.primary.containerColor,
      },
      headerTintColor: Colors.primary.textDark,
      headerTitleStyle: styles.headerText
    }
  }
})

const AppAuth = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: {
      screen: loginStack
    },
    AppNav: WrapperWithRootNavigation

  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export { AppAuth }
