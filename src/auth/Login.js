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
    this.state = {
      status: false,
      isLoading: false,
      urlServer: "",
      usuarioNome: "Vistafood",
      usuarioSenha: "123",
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
    
    let auth = "";
    if( this.state.usuarioNome.length > 0 && this.state.usuarioSenha.length > 0)
         auth = this.state.usuarioNome + '/' + this.state.usuarioSenha
    
    const api = new VistaAPI;
    
    api.create({
      uri:auth,
      apiMethod: 'GETUsuario'
    })

    const response = await api.getUsuario()

    if (typeof response !== 'undefined' && response.ok) {

      const responseJson = await response.json();
      
      if (responseJson.vStatus) {
        this.setState({
          isLoading: false,
          error: false,
          isLoggedIn: true,
          usuario: {
            id_portador: responseJson.id_portador,
            caixa_id: responseJson.caixa_id,
            id_colaborador: responseJson.id_colaborador,
            vStatus: responseJson.vStatus,
            caixa_abertura: responseJson.caixa_abertura,
            id_empresa: responseJson.id_empresa,
            vMensagem: responseJson.vMensagem,
            id_fpagto: responseJson.id_fpagto,
            id_usuario: responseJson.id_usuario,
            id_cliente: responseJson.id_cliente
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
