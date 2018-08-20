import React from 'react';
import { Text, FlatList, Image, ScrollView,SafeAreaView, View, AsyncStorage, StatusBar } from 'react-native';
import {
  Header,
  Content,
  ListItem,
  Icon,
} from 'native-base'
import { Colors, styles } from '../../components/Styles'

const items = [
  {
    routeName: 'Mesas',
    title: 'Mesas',
    icon: (
      <Icon
        name='home'
        type='Feather'
        style={{ fontSize: 18 }}
        color={Colors.secondaryColor}
      />
    )
  },
  {
    routeName: 'Configuracoes',
    title: 'Configurações',
    icon: (
      <Icon
        name='cog'
        type='FontAwesome'
        style={{ fontSize: 18 }}
        color={Colors.secondaryColor}
      />
    )
  }
]

const CustomDrawer = props => {

  //TODO Refatorar e mover para outro componente
  const logout = async() =>{
    await AsyncStorage.removeItem('usuario');
    await AsyncStorage.removeItem('userToken');
    return props.screenProps.rootNavigation.navigate('AuthLoading');
  } 
  
  return (
    <ScrollView>
      <Header style={{ marginBottom: 15, height: 170, backgroundColor:"#fff"}}>
       <StatusBar
            backgroundColor={Colors.primary.containerColor}
            barStyle={Colors.primary.barStyle}
        />
        <SafeAreaView style={{  justifyContent: 'center',alignItems: 'center',}}>
        <Image
            style={{ height: 120, width: 120 }}
            source={require('../../../assets/img/vista.png')}
          />
        </SafeAreaView>
       
      </Header>
      <Content>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <ListItem
              noBorder
              Icon
              onPress={() => props.navigation.navigate(item.routeName)}
            >
              <Text> {item.icon}</Text>
              <Text style={{ marginLeft: 30 }}>{item.title}</Text>
            </ListItem>
          )}
          keyExtractor={item => item.title}
        />
      </Content>
      <Content>
        <ListItem
        style={{ marginLeft: 24 }}
          noBorder
          Icon
          onPress={() => logout() }
        >
          <Text>
            <Icon
              name='sign-out'
              type='FontAwesome'
              style={{ fontSize: 18 }}
              color={Colors.primaryColor}
            />
          </Text>
          <Text style={{ marginLeft: 30 }}>Sair</Text>
        </ListItem>
      </Content>
    </ScrollView>
  )
}

export default CustomDrawer
