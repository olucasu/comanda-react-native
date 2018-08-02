import React, { Component} from 'react';
import {View,ScrollView, Text, RefreshControl, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Icon, FormLabel, FormInput} from 'react-native-elements';
import styles from '../../components/styles';
import VistaAPI from '../../api/VistaAPI'

class Mesas extends Component {

    static navigationOptions = {
        header: null
    }


    state = {
        inputValue : '',
        tables: '',
        isLoading: false,
        refreshing: false
    }

    async fetchData() {
        this.setState({
            isLoading:true
        })

        VistaAPI.create({
            uri: '/GetMesas/2',
            method: 'GET'
        });


        VistaAPI.response().then( (response) => {

           this.setState({
               tables:response,
               isLoading: false
           })
        });
    }

    componentWillMount(){
        this.fetchData();
    }


    _onRefresh(){

        console.log('Im Alive!');
        console.log(this.state);

        this.setState({
            refreshing: true
        });

        this.fetchData().then(() => {
            this.setState({refreshing:false})
        });

    }

    render(){
        
        const tables = this.state.tables;

        if( this.state.isLoading) {

            return(
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
         
        } else {
    

            return(
                <ScrollView style={{flex: 1, backgroundColor:'#000'}}> 
                        <FlatList 
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }
                            keyExtractor={(item, index) => index}
                            data={tables}  numColumns={2} 
                            renderItem={({item}) =>  {
                                    return(
                                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Details',{screenTitle:item.tipo_mesa_cartao+' '+item.id} )} style={styles.item}>
                                            <Text> {item.tipo_mesa_cartao+' '+item.id}</Text>
                                            <Icon name="food" iconStyle={styles.icon} type="material-community"  />
                                        </TouchableOpacity> 
                                    );
                                }
                            }
                        />
          
                </ScrollView>
            )
        }

   
    }
}



export default Mesas;