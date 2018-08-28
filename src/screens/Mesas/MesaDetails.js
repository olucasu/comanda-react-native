import React, { Component } from 'react'
import VistaAPI from '../../api/VistaAPI'
import {
  View,
  TouchableOpacity,
  Text,
  BackHandler
} from 'react-native';

import { Container} from 'native-base';
import {styles} from '../../components/Styles';
import Extrato from '../../components/Mesas/Extrato';
import Reserva from '../../components/Mesas/Reserva';

import Loader from '../../components/Helpers/loader';
import { _getStatusStyle } from '../../components/Helpers/uiHelper';

export default class MesaDetails extends Component {
  
  constructor (props) {
    super(props)

    this.state = {
      id: this.props.navigation.getParam('id', 'Não informado') ,
      status: this.props.navigation.getParam('status', 'Não informado'),
      screenTitle : this.props.navigation.getParam('screenTitle', 'Não informado'),
      idVenda:this.props.navigation.getParam('idVenda', 'Não informado'),
      dataAbertura: this.props.navigation.getParam('dataAbertura', 'Não informado'),
      navigate: this.props.navigation.getParam('navigate', 'Não informado'),
      extrato: [],
      usuario: [],
      reserva:this.props.navigation.getParam('reserva', 'Não informado'),
      updateMesa: this._updateMesa.bind(this) 
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
    const screenProps = this.props.screenProps;
     this.backHandler = BackHandler.addEventListener('hardwareBackPress', function() {
      screenProps._updateMesasIndex();
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  _updateMesa(){
    this.fetchData();
  }

  _getMesaReserva(){

    if(this.state.status == "RESERVADA(O)") {
      return(
        <Reserva reserva={this.state.reserva} />
      )
    }

    return null;
 
  }

  _getHeaderExtrato(){

    const subTotal = () =>{
      let valor = 0
      if(this.state.extrato != null) {
        this.state.extrato.map(item =>  valor += (item.total_item * item.qtde_item) )
        const subTotal = parseFloat(Math.round( valor * 100) / 100).toFixed(2)
        return(` - SubTotal: R$${subTotal}`);
      }
      return "";
    }

    return(
      <View style={[styles.viewHeader, styles[_getStatusStyle(this.state.status)]]}>
          <Text style={styles.viewHeaderText}>{`Status: ${this.state.status} ${subTotal()}`}</Text>
       </View>
    )
  }

  getButtonContainer(){
    if(this.state.status != "CONTA") {
      return(
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.9} style={[styles.button,styles.buttonPrimary]} onPress={()=> this.props.navigation.navigate('Pedidos', this.state)}>
              <Text style={styles.buttonLightText}>Adicionar Item</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render () {
    if(this.state.isLoading) {
        return(
          <Loader />
        )
    } else {
      return(
        <Container style={styles.container}>
            {this._getHeaderExtrato()}
            {this._getMesaReserva()}
            <Extrato extrato={this.state.extrato} />
            {this.getButtonContainer()}
        </Container>
      )
    }
  }
}
