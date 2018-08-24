import React, { Component } from 'react'
import VistaAPI from '../../api/VistaAPI'
import {
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  Text
} from 'react-native';
import { Container, Content, H2, H3 , Button} from 'native-base';
import {styles} from '../../components/Styles';
import Extrato from '../../components/Mesas/Extrato';
import Loader from '../../components/Helpers/loader';

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
  }

  _updateMesa(){
    this.fetchData();
    this.props.screenProps._updateMesasIndex();
  }

  _getHeaderExtrato(){
    let valor = 0
    if(this.state.extrato != null) {
      this.state.extrato.map(item =>  valor += (item.total_item * item.qtde_item) )

      const subTotal = parseFloat(Math.round( valor * 100) / 100).toFixed(2)
      return(
        <View style={styles.viewHeader}>
            <Text style={styles.viewHeaderText} > Comanda | Total: R$ {subTotal}</Text>
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
            <Extrato extrato={this.state.extrato} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.9} style={[styles.button,styles.buttonPrimary]} onPress={()=> this.props.navigation.navigate('Pedidos', this.state)}>
                    <Text style={styles.buttonLightText}>Adicionar Item</Text>
                </TouchableOpacity>
            </View>
        </Container>
      )
    }
  }
}
