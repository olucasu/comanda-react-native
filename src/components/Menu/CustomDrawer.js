import React, {Component} from 'react';
import { Text, FlatList, Image, ScrollView,SafeAreaView, View, AsyncStorage, StatusBar } from 'react-native';
import {
  Header,
  Content,
  ListItem,
  Icon,
} from 'native-base'
import { Colors, styles } from '../../components/Styles'
import Token from '../../auth/Token';
import Loader from '../Helpers/loader';
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

class CustomDrawer extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      usuario: null
    }
  }

  //TODO Refatorar e mover para outro componente
  logout = async() =>{
    await AsyncStorage.removeItem('usuario');
    await AsyncStorage.removeItem('userToken');
    return this.props.screenProps.rootNavigation.navigate('AuthLoading');
  } 

  getUsuario =  async() => {
    usuario = await AsyncStorage.getItem('usuario');
    this.setState({isLoaded:true, usuario: JSON.parse(usuario)})
  }

  
  componentDidMount(){
    this.getUsuario();
  }

  render() {
    if(this.state.isLoaded) { 
      return (
        <ScrollView style={{backgroundColor:Colors.primary.containerColor}}>
          <Header style={{ marginBottom: 15, height: 170, backgroundColor: Colors.primary.containerColor}}>
           <StatusBar
                backgroundColor={Colors.primary.containerColor}
                barStyle={Colors.primary.barStyle}
            />
            <SafeAreaView style={{  justifyContent: 'center',alignItems: 'center',}}>
            <Image
                style={{ height: 120, width: 120 }}
                source={require('../../../assets/img/vista.png')}
              />
            <View style={{paddingHorizontal:15}}>
               <Text style={[styles.text,{ textAlign:"center"}]}>{this.state.usuario.empresa_fantasia}</Text>
            </View>
            </SafeAreaView>
         
          </Header>

          <Content>
          
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <ListItem
                  noBorder
                  Icon
                  onPress={() => this.props.navigation.navigate(item.routeName)}
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
          <Content >
            <ListItem
            style={{ marginLeft: 19 }}
              noBorder
              Icon
              onPress={() => this.logout() }
            >
                <View style={{width:30, marginRight:30, justifyContent:'center', alignItems:'center'}}>
                  <Icon
                    name='sign-out'
                    type='FontAwesome'
                    style={{ fontSize: 24 ,color: Colors.primary.textDark}}
                  />
                </View>
              <Text style={[styles.text]}>Sair</Text>
            </ListItem>
          </Content>
        </ScrollView>
      )
    } else {
      return(
        <Loader />
      )
    } 
  }
}
export default CustomDrawer
