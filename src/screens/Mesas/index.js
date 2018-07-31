import React, { Component} from 'react';
import {View,ScrollView, Text, StyleSheet, FlatList, TouchableOpacity, Button} from 'react-native';
import {Icon, FormLabel, FormInput} from 'react-native-elements';
import styles from '../../components/styles';

class Mesas extends Component {

    static navigationOptions = {
        header: null
    }
    
    getTables = function() {
        
        const data = [];

        for( var i = 1; i <= 30 ; i ++) {
            data.push({ 'id' : i, key: 'Mesa '+ i});
        }
        
       return (
            data
       )
    }

    searchTables = () => {
        tables = this.state.tables;
        console.log(tables);
    }

    state = {
        tables : this.getTables(),
        inputValue : ''
    }


    render(){
        
        const tables = this.getTables();

        

        return(
            <ScrollView>
                <Text h2> Atendente X </Text>
                <View>
                    <FormLabel>Nº Mesa ou Comanda</FormLabel>
                    <FormInput onChangeText={text => this.setState({inputValue: text})} onSubmitEditing={ () => this.searchTables() }  />
                </View>
                <FlatList 

                    data={tables}  numColumns={3} 
                    renderItem={({item}) =>  {
                            return(
                                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Details',{screenTitle:item.key} )} style={styles.item}>
                                    <Text> {item.key}</Text>
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


export default Mesas;