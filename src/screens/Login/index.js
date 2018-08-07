import React, { Component } from 'react'
import { View } from 'react-native'
import VistaAPI from '../../api/VistaAPI'
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


    console.dir(props)

    this.state = {
      status: false,
      isLoading: false,
      usuarioNome: '',
      usuarioSenha: '',
      idUsuario: '',
      idColaborador: '',
      idEmpresa: '',
      idCaixa: ''
    }
  }

  async fetchData () {
    this.setState({
      isLoading: true
    })

    const auth =  this.state.usuarioNome +'/'+this.state.usuarioSenha;

    VistaAPI.create({
      uri: 'GETUsuario/' + auth,
      method: 'GET'
    })

    console.dir(VistaAPI);

    let response = await VistaAPI.response()

    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()

      console.log(responseJson)

      this.setState({
        tables: responseJson,
        isLoading: false,
        error: false
      })
    } else {
      this.setState({
        isLoading: false,
        error: response.error
      })
    }
  }

  login () {
    this.fetchData();
  }

  render () {

    return (
      <Container>
        <Content
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
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

export default Login
