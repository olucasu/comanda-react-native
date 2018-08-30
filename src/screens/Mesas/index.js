import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native'
import {styles,Colors} from '../../components/Styles';
import Loader from '../../components/Helpers/loader';
import VistaAPI from '../../api/VistaAPI';
import { Container, View, Icon } from 'native-base';
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
        updatedFromOutside: false,
        inputBuscaMesa: "" ,
        localMemoryTables:[]
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
        localMemoryTables: responseJson,
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
      updatedFromOutside: true
    }, this.fetchData)

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


  handleSearch (stringEmpty, string) { 

    const prevTables = this.state.tables;

    if(stringEmpty) {
      return this.setState({ tables: this.state.localMemoryTables, inputBuscaMesa: ""} )
    }

    let searchResultArr = []; 

    prevTables.filter(item => {
      if(item.id.toString().indexOf(string) >= 0) {
        searchResultArr.push(item)
      }
    });

    this.setState( () => {
      return { tables: searchResultArr, inputBuscaMesa:string, listIsLoading: true}
    })

  }


  inputBuscaMesas(autofocus) {
    return (
      <View style={[styles.buttonContainer,  {flexDirection:'row'}]}>
          <TextInput
            autoFocus={autofocus}
            style={[styles.inputShadow, styles.inputShadowBorder, {flex:1}]}
            keyboardType={"numeric"}
            placeholder='Buscar Mesa ou cartão'
            underlineColorAndroid = "transparent"
            placeholderTextColor={Colors.primary.textDark}
            onChangeText={(inputBuscaPorNome) => {
              if( inputBuscaPorNome.length <= 0) return this.handleSearch(true)
                this.handleSearch(false,inputBuscaPorNome)
            }}
            onKeyPress={(e)=> {  if(e.nativeEvent.key == "Backspace" && this.state.tables.length >= 1){
              this.setState({tables:this.state.localMemoryTables})
            }}}
           
            value={this.state.inputBuscaMesa}
          />
          </View>
          
    )
  }

  render () {

    const tables = this.state.tables

    console.log(tables);

    if (this.state.isLoading) {
      return (
        <Loader />
      )
    } else {
      if (!this.state.error) {
      if(!tables || tables.length <= 0){
        return(

          <ScrollView 
              contentContainerStyle={{flexGrow: 1}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
          }>
             {this.inputBuscaMesas(true)}

            <EmptyResult showUpdate={this.fetchData}  message="Não há mesas." />
        </ScrollView>
        )
         
      } 
        return (
          <Container style={styles.container}>
             {this.inputBuscaMesas()}
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
                      reserva: {
                        reserva_nome: item.reserva_nome,
                        reserva_fone: item.reserva_fone,
                        reserva_hora: item.reserva_hora,
                        reserva_pessoas: item.reserva_pessoas,
                      }
                  }


                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        this.setState({inputBuscaMesa:""})
                        this.props.navigation.navigate('Details', itemParams)}
                      }
                        style={[styles.tableCard]}
                    >
                      {icon}
                      <Text style={styles.tableCardText}>{tipoMesa}</Text>
                      <Text style={ styles.tableCardNumber}>{ item.id}</Text>
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
