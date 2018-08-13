import React, { Component } from 'react'
import VistaAPI from '../../api/VistaAPI'
import {
  ScrollView,
  Button,
  View,
  TouchableOpacity,
  FlatList,
  Text
} from 'react-native'

import Extrato from '../../components/Mesas/Extrato';
import Loader from '../../components/Helpers/loader';


export default class MesaDetails extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.navigation.getParam('id', 'Não informado') ,
      status: this.props.navigation.getParam('status', 'Não informado'),
      screnTitle : this.props.navigation.getParam('screenTitle', 'Não informado'),
      idVenda:this.props.navigation.getParam('idVenda', 'Não informado'),
      dataAbertura: this.props.navigation.getParam('dataAbertura', 'Não informado'),
      extrato: [],
      usuario: []

    }
 
  }

  async fetchData () {
    
    this.setState({
      isLoading: true
    })

    const api = new VistaAPI;

    api.create({
      apiMethod: 'GETMesasExtrato',
      uri: this.state.id,
    })

    let response = await api.get()
    if (typeof response !== 'undefined' && response.ok) {
      let responseJson = await response.json()
      this.setState({
        extrato: responseJson,
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
    this.fetchData();
  }

  render () {
    if(this.state.isLoading) {
        return(
          <Loader />
        )
    } else {
      return(
        <ScrollView style={{marginBottom:30}}>
            <Button  onPress={()=> this.props.navigation.navigate('Pedidos', this.state)} title='Adicionar Pedido'/>
            <Extrato extrato={this.state.extrato} />
        </ScrollView>
      )
    }

  
  }
}
