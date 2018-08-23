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
        type='MaterialIcons'
        style={{ fontSize: 24, color: Colors.primary.textDark}}
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
        style={{ fontSize: 24, color:Colors.primary.textDark}}
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
              <View style={{width:30,  marginRight:30, justifyContent:'center', alignItems:'center'}}>
                 {item.icon}

              </View>
              <Text style={[ styles.text]}>{item.title}</Text>
            </ListItem>
          )}
          keyExtractor={item => item.title}
        />
      </Content>
      <Content>
        <ListItem
        style={{ marginLeft: 19 }}
          noBorder
          Icon
          onPress={() => logout() }
        >
            <View style={{width:30, marginRight:30, justifyContent:'center', alignItems:'center'}}>
              <Icon
                name='sign-out'
                type='FontAwesome'
                style={{ fontSize: 24 ,color: Colors.primary.textDark}}
                color={Colors.primaryColor}
              />
            </View>
         
          
          <Text style={[styles.text]}>Sair</Text>
        </ListItem>
      </Content>
    </ScrollView>
  )
}

export default CustomDrawer
