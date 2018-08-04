import React from 'react'
import { YellowBox } from 'react-native'
import { Icon , Header} from 'react-native-elements'
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
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
          title: 'Todas',
        }
      }
    },
    LIVRE: {
      screen: Mesas,
      navigationOptions: navigation => {
        return {
          title: 'Livre',
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
    tabBarOptions: {
      scrollEnabled: true
    }
  }
)

const MesasNav = createStackNavigator({
  Mesas: {
    screen: InsideTabMesa,
    navigationOptions: ({navigation}) => {
        return(
            {
                title: 'Mesas',
                // header:''.,
                headerMode: 'screen',
                headerTintColor: '#fff',
                headerStyle:{
                    backgroundColor:'#2196F3',
                    shadowRadius: 0,
                    elevation: 0
                },
                headerTitleStyle: {
                    fontWeight: '300',
                },
                // headerLeft :<Icon name='cogs' type='material-community' navigate={navigation.navigate('DrawerOpen')}  color='#517fa4' /> ,
            }
        )
    }
  },
  Details: {
    screen: MesaDetails,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('screenTitle', 'Mesa não identificada')
    })
  }
})

/*
    * Navegação Geral
*/

const App =  createDrawerNavigator({
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

export default App
