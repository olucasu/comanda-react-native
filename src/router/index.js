import React from 'react';
import { YellowBox } from 'react-native'
import {Icon} from 'react-native-elements';
import { createBottomTabNavigator, createStackNavigator} from 'react-navigation';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])


/*
    * Importando telas
*/

import Mesas from '../screens/Mesas';
import MesaDetails from '../screens/Mesas/MesaDetails';
import Configuracoes from '../screens/Configuracoes';

/*
    * Navegação interna 
*/

const MesasNav = createStackNavigator({
    'Mesas':{
        screen: Mesas
    },
    'Details': {
        screen: MesaDetails,
        navigationOptions: ({navigation}) => ({
            title: navigation.getParam('screenTitle', 'Mesa não identificada')
        })
    }
});

/*
    * Navegação Geral 
*/

const App =  createBottomTabNavigator({              
    Home: {
        screen: MesasNav,
        navigationOptions : ({ navigation }) => ({
            tabBarIcon: () => {
              return <Icon name='home' type="material-community" color='#517fa4' />
            },
            title: 'Mesas'
          })
    },
    Configuracoes: {
        screen: Configuracoes,
        navigationOptions : ({ navigation }) => ({
            tabBarIcon: () => {
              return <Icon name="cogs" type="material-community" color='#517fa4' />
            },
          })
    }
})

export default App;


