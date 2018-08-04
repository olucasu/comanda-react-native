import React, { Component } from 'react'
import {
  Text,
  ScrollView,
  View,
  Button,
  Picker,
  StyleSheet
} from 'react-native'

import VistaAPI from '../../api/VistaAPI'
import Modal from '../../components/Mesas/modal'

export default class MesaDetails extends Component {
  constructor (props) {
    super(props)
  }

  state = {
    status: 'desocupada',
    modalVisible: false,
    categoriasProduto: ''
  }

  async fetchData () {
    this.setState({
      isLoading: true
    })

    VistaAPI.create({
      uri: 'GetGrupos/2/',
      method: 'GET'
    })

    let response = await VistaAPI.response()

    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()

      this.setState({
        categoriasProduto: responseJson,
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

  componentWillMount () {
    this.fetchData()
  }

  componentDidMount () {
    this.fetchData()
  }

  toggleModal = () => {
    const visibility = !this.state.modalVisible
    this.setState({ modalVisible: visibility })
  }

  render () {


    for( let i = 0 ; i <= this.state.categoriasProduto ; i++)
        console.dir(this.state.categoriasProduto);

    return (
      <ScrollView>
        <Modal modalVisible={this.state.modalVisible} />
        <Button onPress={this.toggleModal} title='Buscar por categoria' />
        <Picker
          selectedValue={this.state.categoria}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState({ categoria: itemValue })}>
           
        </Picker>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  modalInner: {
    backgroundColor: '#fff',
    height: '100%'
  }
})
