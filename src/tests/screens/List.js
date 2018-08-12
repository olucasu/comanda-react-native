import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import {styles, Colors} from '../../components/Styles';
import Loader from '../../components/Helpers/loader';
import VistaAPI from '../../api/VistaAPI';
import { Container, Icon } from 'native-base';
import {getIconMesa} from '../../components/Helpers/uiHelper';

class List extends Component {
  static navigationOptions = {}

  constructor (props) {
    super(props)
    this.api = new VistaAPI();
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

    this.api.create({
      uri: this.state.routeName,
      method: 'GET'
    })

    let response = await this.api.getCustomEndPoint()

    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()
      this.setState({
        tables: responseJson.results,
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
        <Loader />
      )
    } else {
      if (!this.state.error) {

        return (
          <Container>
          <FlatList 
            style={styles.container}
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
                  
                  style={styles.tableCar}
                >
                  <Text style={[styles.tableCardText, styles.tableCardNumber]}>{ item.name}</Text>
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

export default List
