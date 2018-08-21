import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import {styles} from '../../components/Styles';
import Loader from '../../components/Helpers/loader';
import VistaAPI from '../../api/VistaAPI';
import { Container, Content } from 'native-base';
import {getIconMesa} from '../../components/Helpers/uiHelper';

class Mesas extends Component {
  

  constructor (props) {
    super(props)
    this.state = { 
        routeName: this.props.navigation.state.routeName,
        inputValue: '',
        tables: '',
        isLoading: false,
        refreshing: false,
        error: false
    }
  }

  async fetchData () {
    this.setState({
      isLoading: true
    })

    const api = new VistaAPI;

    api.create({
      uri: this.state.routeName,
      apiMethod : 'GETMesas'
    })

    let response = await api.get()

    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()

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

  componentDidMount() {
      this.fetchData();
  }

  _onRefresh () {
    this.setState({
      refreshing: true
    })

    this.fetchData()

    this.setState({ refreshing: false })

    this.forceUpdate()
  }
  
  getStatusStyle(status){
    switch(status) {
      case 'OCUPADA(O)':
          return 'tableCardOcupado'
          break;
      case 'CONTA':
          return 'tableCardConta'
          break;
      case 'RESERVADA(O)':
          return 'tableCardReservado'
          break;
      case 'Livre':
          return 'tableCardLivre'
          break;
      default:
          return 'tableCardLivre'
    }
  }

  render () {

    const tables = this.state.tables

    if (this.state.isLoading) {
      return (
        <Loader />
      )
    } else {
      if (!this.state.error) {
        return (
          <Container style={styles.container}>
              <FlatList 
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
                keyExtractor={(item, index) => index}
                data={tables}
                numColumns={2}
                renderItem={({ item }) => {

                  const styleStatus = this.getStatusStyle(item.status_descricao)
                  const tipoMesa = item.tipo_mesa_cartao === 'MESA'? 'Mesa' : 'Cartão';   
                  let icon = getIconMesa(item.status_descricao);

                  const navigate = this.props.navigation.navigate;

                  const itemParams = {
                      id: item.id,
                      status: item.status_descricao,
                      idVenda: item.id_venda,
                      dataAbertura: item.ab_data,
                      screenTitle: tipoMesa + ' ' + item.id,
                      navigate : navigate
                  }


                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        this.props.navigation.navigate('Details', itemParams)}
                      style={[styles.tableCard]}
                    >
                      <Text style={styles.tableCardText}>{icon}{tipoMesa}</Text>
                      <Text style={[styles.tableCardText, styles.tableCardNumber]}>{ item.id}</Text>
                    </TouchableOpacity>
                  )
                }}
              />

          </Container>
        )
      } else {
        return (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          >
            <Text>Não foi possível carregar os dados, motivo:</Text>
            <Text> {this.state.error} </Text>
          </ScrollView>
        )
      }
    }
  }
}
export default Mesas;
