import React, { Component } from 'react';
import { AsyncStorage, StatusBar, View, TouchableOpacity, ToastAndroid, TextInput } from 'react-native';
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Label
} from 'native-base'

import {styles, Colors} from '../../components/Styles';
class ConfigurarUrlServer extends Component {


  constructor(props){
    super(props)

    this._getUrlAsync();

    this.state ={
      urlServer: ''
    }
  }

  _storeDataAsync = async () => {
    let self = this;
    try {

      if(self.state.urlServer != "" || self.state.urlServer != null)
        await AsyncStorage.setItem('urlServer', self.state.urlServer.trim())
        this.props.navigation.navigate('AuthLoading');

        return ToastAndroid.show('Salvo com sucesso!', ToastAndroid.SHORT);
    } catch (error) {
    }
  }

  _getUrlAsync = async () => {

    try{

        //Recupera a URL AsyncStorage
        const urlServer = await AsyncStorage.getItem('urlServer');
        this.setState({urlServer: urlServer});
        
    } catch(error) {
    }
 
}


  render () {
    return (
      <Container style={styles.container}>
           <StatusBar
            backgroundColor={Colors.primary.containerColor}
            barStyle={Colors.primary.barStyle}
        />
        <Content style={styles.content}>
              <TextInput
                 underlineColorAndroid ={Colors.primary.lightColor}
                  placeholder="URL do servidor"
                style={styles.text}
                onChangeText={urlServer =>
                  this.setState({ urlServer: urlServer })}
                value={this.state.urlServer}
              />
            <View style={[styles.buttonGroup]}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonPrimary]}
                      onPress={()=> this._storeDataAsync()}
                    >
                      <Text style={styles.buttonLightText}>Salvar Alterções</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Content>
      </Container>
    )
  }
}

export default ConfigurarUrlServer
