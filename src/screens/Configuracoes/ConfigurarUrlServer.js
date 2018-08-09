import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import {
  Container,
  Button,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label
} from 'native-base'

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
      await AsyncStorage.setItem('urlServer', self.state.urlServer)
      console.dir('store!')
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.dir(error)
    }
  }

  _getUrlAsync = async () => {

    try{

        //Recupera a URL AsyncStorage
        const urlServer = await AsyncStorage.getItem('urlServer');
        this.setState({urlServer: urlServer});
        
    } catch(error) {
        console.dir(error);
    }
 
}


  render () {
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>URL</Label>
              <Input
                onChangeText={urlServer =>
                  this.setState({ urlServer: urlServer })}
                value={this.state.urlServer}
              />
            </Item>
            <Button onPress={()=> this._storeDataAsync()} style={{ marginTop: 20 }} primary full>
              <Text>Salvar Alterações</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

export default ConfigurarUrlServer
