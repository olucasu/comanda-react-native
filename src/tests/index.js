import { styles, Colors } from '../components/Styles';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation'

/*
    * Importando telas
*/

// List
import List from './screens/List'

const InsideTabMesa = createMaterialTopTabNavigator(
    {
      people: {
        screen: List,
        navigationOptions: navigation => {
          return {
            title: 'Pessoas'
          }
        }
      },
      planets: {
        screen: List,
        navigationOptions: navigation => {
          return {
            title: 'Planetas'
          }
        }
      },
      starships: {
        screen: List,
        navigationOptions: {
          title: 'Naves'
        }
      },
      vehicles: {
        screen: List,
        navigationOptions: {
          title: 'Veículos'
        }
      },
      species: {
        screen: List,
        navigationOptions: {
          title: 'Espécies'
        }
      }
    },
    {
      tabBarOptions: {
        lazy: true,
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
      initialRouteName: 'people',
      optimizationsEnabled: true
    }
  )
  
  const tests = createStackNavigator(
    {
      List: {
        screen: InsideTabMesa,
        navigationOptions: ({ navigation }) => {
          return {
            title: 'STAR WARS API',
            headerMode: 'screen',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#000',
              shadowRadius: 0,
              elevation: 0
            },
            headerTitleStyle: {
              fontWeight: '300'
            }
          }
        }
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
  

  




export {tests}