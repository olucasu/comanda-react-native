import React from 'react';
import { styles, Colors } from '../components/styles';
import {Icon} from 'native-base';
import { YellowBox } from 'react-native'
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation'
import Menu from '../components/Menu'
import CustomDrawer from '../components/Menu/CustomDrawer'

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
          title: 'Reservadas'
        }
      }
  }, {
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
    lazy: true,
    initialRouteName: 'Todas',
    optimizationsEnabled: true
  }
)

const MesasNav = createStackNavigator(
    {
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
        }
      })
    }
)

const ConfigNav = createStackNavigator({
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
    }  
})

const AppNav = createDrawerNavigator({
  Home: {
    screen: MesasNav,
    navigationOptions: ({ navigation }) => ({
      drawerIcon: () => {
        return <Icon name='home' type='Feather' style={{fontSize:18}} color= {Colors.secondaryColor} />
      },
      title: 'Mesas'
    })
  },
  Configuracoes: {
    screen: ConfigNav,
    navigationOptions: ({ navigation }) => ({
      drawerIcon: () => {
        return <Icon name='cogs' type='FontAwesome' style={{fontSize:18}} color= {Colors.secondaryColor} />
      }
    })
  }
},
  {
    contentComponent: CustomDrawer
  }
)

export { AppNav }
