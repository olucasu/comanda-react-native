import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native'
import styles from '../../components/styles'
import VistaAPI from '../../api/VistaAPI'

class Mesas extends Component {
  static navigationOptions = {}

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

    VistaAPI.create({
      uri: 'GetMesas/2/'+this.state.routeName,
      method: 'GET'
    })

    let response = await VistaAPI.response()

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

  componentDidMount () {
    this.fetchData()
  }

  _onRefresh () {
    this.setState({
      refreshing: true
    })

    this.fetchData()

    this.setState({ refreshing: false })

    this.forceUpdate()
  }

  render () {

    const tables = this.state.tables

    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      )
    } else {
      if (!this.state.error) {
        return (
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
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Details', {
                      screenTitle: item.tipo_mesa_cartao + ' ' + item.id
                    })}
                  style={styles.item}
                >
                  <Text> {item.tipo_mesa_cartao + ' ' + item.id}</Text>
                  <Text>{item.status_descricao}</Text>
                </TouchableOpacity>
              )
            }}
          />
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

export default Mesas
