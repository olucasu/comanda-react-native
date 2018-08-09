import React from 'react';
import { Text, FlatList, Image, ScrollView, View, AsyncStorage } from 'react-native'
import {
  Header,
  Content,
  ListItem,
  Icon,
  List,
  Left,
  Body,
  Right
} from 'native-base'
import { Colors } from '../../components/Styles'

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
        name='cogs'
        type='FontAwesome'
        style={{ fontSize: 18 }}
        color={Colors.secondaryColor}
      />
    )
  }
]




const CustomDrawer = props => {

  const logout =  async () => {
    await AsyncStorage.clear();
    props.screenProps.rootNavigation.navigate('AuthLoading');
  }
  
  return (

    <ScrollView>
      <Header
        androidStatusBarColor={Colors.secondaryColor}
        style={{ marginBottom: 15, backgroundColor: '#ECEFF1', height: 170 }}
      >
          <Image
            style={{ height: 120, width: 120 }}
            source={require('../../assets/img/vista.png')}
          />
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
          noBorder
          Icon
          onPress={() => logout() }
        >
          <Text>
            <Icon
              name='sign-out'
              type='FontAwesome'
              style={{ fontSize: 18 }}
              color={Colors.secondaryColor}
            />
          </Text>
          <Text style={{ marginLeft: 30 }}>Sair</Text>
        </ListItem>
      </Content>
    </ScrollView>
  )
}

export default CustomDrawer
