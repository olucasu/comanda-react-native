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
import { Container, Content, View } from 'native-base';
import {getIconMesa} from '../../components/Helpers/uiHelper';
import EmptyResult from '../../components/Helpers/EmptyResult';
class Mesas extends Component {
  

  constructor (props) {
    super(props)
    this.state = { 
        routeName: this.props.navigation.state.routeName,
        inputValue: '',
        tables: '',
        isLoading: false,
        refreshing: false,
        error: false,
        updatedFromOutside: false
    }

    this.fetchData = this.fetchData.bind(this);
    this,this.updateMesas = this.updateMesas.bind(this)
    this.props.screenProps._updateMesasIndex = this.updateMesas;
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

  updateMesas(){
    this.setState({
      updatedFromOutside
    }, this.fetchData)

  }

  componentDidMount() {
      this.fetchData();
      console.log("INDEX MONTOU");
  }

  componentWillUnmount(){
    console.log("INDEX DESMONTOU");

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
      if(!tables){
        return(
          <ScrollView 
              contentContainerStyle={{flexGrow: 1}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
          }>
            <EmptyResult showUpdate={this.fetchData}  message="Não há mesas." />
        </ScrollView>
        )
         
      } 
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
                      navigate : navigate,
                  }


                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() =>
                        this.props.navigation.navigate('Details', itemParams)}
                        style={[styles.tableCard]}
                    >
                      {icon}
                      <Text style={styles.tableCardText}>{tipoMesa}</Text>
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
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          >
          
            <EmptyResult showUpdate={this.fetchData} icon={{iconName: "warning", iconType:"MaterialIcons" }} onRefresh message={this.state.error} />

          </ScrollView>
        )
      }
    }
  }
}
export default Mesas;
