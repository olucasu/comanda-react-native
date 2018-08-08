import React from 'react'
import {Text, FlatList, Image } from 'react-native'
import { Container, Header, Content, ListItem, Icon, List, Left, Body, Right } from 'native-base'
import { Colors } from '../../components/styles'

const items = [
 {
    routeName : 'Mesas',
    title: 'Mesas',
    icon : <Icon name='home' type='Feather' style={{fontSize:18} } color= {Colors.secondaryColor} />
 },
 {
    routeName : 'Configuracoes',
    title: 'Configurações',
    icon : <Icon name='cogs' type='FontAwesome' style={{fontSize:18}} color= {Colors.secondaryColor} />
 }
]

 const CustomDrawer = (props) => {
    return (
      <Container>
        <Header androidStatusBarColor={Colors.secondaryColor} style={{ marginBottom: 15 ,backgroundColor: '#ECEFF1', height: 170 }} >
            <Content style={{flex:1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{flex:1, alignSelf: 'stretch', height: 120,width: 120}}
                source={require('../../assets/img/vista.png')}
                />
            </Content>
        </Header>
        <Content>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <ListItem noBorder Icon onPress={() => props.navigation.navigate(item.routeName)}>
                    <Text> {item.icon}</Text>
                    <Text style={{marginLeft: 30}}>{item.title}</Text>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    )
}

export default CustomDrawer;
