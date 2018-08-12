import React, { Component } from 'react'
import { AsyncStorage, Alert } from 'react-native'
import VistaAPI from '../api/VistaAPI';
import Loader from '../components/Helpers/loader'

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Label,
} from 'native-base'

class Login extends Component {
  constructor (props) {

    super(props)

    this.api = new VistaAPI();

    this.state = {
      status: false,
      isLoading: false,
      urlServer: "",
      usuarioNome: "",
      usuarioSenha: "",
      usuario: {
        vvendas_portador: "",
        vcaixa_id: "",
        vid_colaborador: "",
        vStatus: "",
        vcaixa_abertura: "",
        vid_empresa: "",
        vMensagem: "",
        vpdv_formapagto: "",
        vid_usuario: "",
        vpdv_cliente: ""
      }
    }

    this._getConfigsAsync();
  }

  async fakeLogin(){

    this.setState({isLoading: true});

    this.setState({isLoading: false});
  
    this.props.navigation.navigate('AppNav');
    

  }

  async login () {

    if(this.state.urlServer == "") {
      Alert.alert('Mas primeiro: ', 'Configure a URL do servidor');
      return this.props.navigation.navigate('ConfigurarUrlServer');
    }

    this.setState({ isLoading: true })
    const auth = this.state.usuarioNome + '/' + this.state.usuarioSenha
    

    this.api.create({
      uri: 'GETUsuario/' + auth,
      method: 'GET'
    })

    let response = await this.api.response()

    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()

      if (responseJson.vStatus) {
        this.setState({
          isLoading: false,
          error: false,
          isLoggedIn: true,
          usuario: {
            vvendas_portador: responseJson.vvendas_portador,
            vcaixa_id: responseJson.vcaixa_id,
            vid_colaborador: responseJson.vid_colaborador,
            vStatus: responseJson.vStatus,
            vcaixa_abertura: responseJson.vcaixa_abertura,
            vid_empresa: responseJson.vid_empresa,
            vMensagem: responseJson.vMensagem,
            vpdv_formapagto: responseJson.vpdv_formapagto,
            vid_usuario: responseJson.vid_usuario,
            vpdv_cliente: responseJson.vpdv_cliente
          }
        })

        await this._storeDataAsync()

        this.setState({
          isLoading: false
        })

        this.props.navigation.navigate('AuthLoading')
      } else {
        this.setState({
          isLoading: false
        })

        alert('Não foi possível fazer o Login: ' + responseJson.vMensagem)
      }
    } else {
      this.setState({
        isLoading: false,
        error: response.error
      })

      Alert.alert('Opa, tivemos um problema', response.error ? response.error : "Não consegui realizar o login, a URL está correta?"  );
    }
  }

  _storeDataAsync = async () => {
    let self = this
    try {
      await AsyncStorage.setItem('userToken', 'Logado')
      await AsyncStorage.setItem('usuario', JSON.stringify(self.state.usuario))
    } catch (error) {
      console.error(error)
    }
  }

  componentDidMount(){
    this.forceUpdate();
  }

  _getConfigsAsync = async () => {
    const urlServer = await AsyncStorage.getItem('urlServer');
    
    this.setState({
      urlServer: urlServer == null ? "": urlServer
    })
  }

  render () {
    if (this.state.isLoading) {
      return <Loader />
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
              <Button
                style={{ marginTop: 20 }}
                onPress={() => this.props.navigation.navigate('Configuracoes')}
                primary
                full
              >
                <Text>Configurações</Text>
              </Button>
              <Button  warning
                full onPress={ () => this.props.navigation.navigate('tests')}>
              <Text>tests</Text>
              </Button>
            </Form>
          </Content>
        </Container>
      )
    }
  }
}

export default Login
