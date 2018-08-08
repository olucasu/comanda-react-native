import React, { Component } from 'react'
import { View , ActivityIndicator} from 'react-native'
import VistaAPI from '../api/VistaAPI'
import {styles,Colors} from '../components/styles'

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Right,
  Button,
  Icon,
  Title,
  Body,
  Text,
  Label
} from 'native-base'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      status: false,
      isLoading: false,
      usuarioNome: '',
      usuarioSenha: '',
      idUsuario: '',
      idColaborador: '',
      idEmpresa: '',
      idCaixa: '',
      isLoggedIn: false
    }
  }

  async fetchData () {
  
  
    this.setState({
      isLoading: true
    })
    const auth =  this.state.usuarioNome +'/'+this.state.usuarioSenha;

    // VistaAPI.create({
    //   uri: 'GETUsuario/' + auth,
    //   method: 'GET'
    // })
    VistaAPI.setCustomEndPoint('https://swapi.co/api/people/1')

    let response = await VistaAPI.getCustomEndPoint()

    if (typeof response !== 'undefined' && response.ok) {

      let responseJson = await response.json()
      

      this.setState({
        isLoading: false,
        error: false,
        isLoggedIn: true
      })

    } else {
      this.setState({
        isLoading: false,
        error: response.error
      })
      alert('Não foi possível fazer o login', this.state.error);
    }
  }

  login () {
    this.fetchData();
  }

  render () {

    if(this.state.isLoggedIn) {
      this.props.parentState(true);
    }

    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size='large' color={Colors.secondaryColor} />
        </View>
      )
    } else {
      
    return (

      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Usuário</Label>
              <Input
                onChangeText={usuarioNome =>
                  this.setState({ usuarioNome: usuarioNome })}
                value={this.state.usuarioNome}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Senha</Label>
              <Input
                secureTextEntry
                onChangeText={usuarioSenha =>
                  this.setState({ usuarioSenha: usuarioSenha })}
                value={this.state.usuarioSenha}
              />
            </Item>
            <Button
              style={{ marginTop: 20 }}
              onPress={() => this.login()}
              primary
              full
            >
              <Text>Entrar</Text>
            </Button>
          </Form>

        </Content>

      </Container>
    )
    }

  }
}

export default Login
